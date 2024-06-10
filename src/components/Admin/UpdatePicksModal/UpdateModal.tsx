"use client";
import Modal from "react-modal";
import React from "react";
import { IoIosClose } from "react-icons/io";
import { useGlobalState } from "@/app/context/store";
import { gql, useMutation } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import eventEmitter from "../../../../lib/eventEmitter";

const UPDATE_PICK_MUTATION = gql`
  mutation UpdatePick(
    $id: Int!
    $result: String!
    $status: String!
    $net: Float!
  ) {
    updatePick(id: $id, result: $result, status: $status, net: $net) {
      result
      status
      net
    }
  }
`;

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const UpdateModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const { state, dispatch } = useGlobalState();
  const [net, setNet] = React.useState<number>(state.currentGame?.toWin ?? 0);
  const [status, setStatus] = React.useState<string>("Not Started");
  const [result, setResult] = React.useState<string>("Win");

  const [updatePick, { data, loading, error }] =
    useMutation(UPDATE_PICK_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if (state.currentGame) {
      const variables = {
        id: Number(state.currentGame?.id),
        status: status,
        result: result,
        net: net,
      };
      try {
        const updatedPick = await toast.promise(updatePick({ variables }), {
          loading: "Updating Picks...",
          success: (result) => {
            return "Picks successfully Updated! 🎉";
          },
          error: (error) => {
            return `Something went wrong 😥 Please try again - ${error.message}`;
          },
        });
        eventEmitter.emit("pickUpdated", updatedPick);
      } catch (err) {
        toast.error(`${err}`);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center p-4 text-black"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold mb-4">
            {state.currentGame?.awayTeam} @ {state.currentGame?.homeTeam}
          </h2>
          <IoIosClose
            onClick={closeModal}
            className="pointer text-red"
            color={"red"}
            size={25}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Status">Status: </label>
            <select
              id="Status"
              name="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </div>

          <div className="my-4">
            <label htmlFor="Result">Result: </label>
            <select
              id="Result"
              name="Result"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="Win">Win</option>
              <option value="Lose">Lose</option>
            </select>
          </div>

          <div>
            <label htmlFor="Net">Net Gain/Loss: </label>

            <input
              value={net}
              type="number"
              onChange={(e) => setNet(Number(e.target.value))}
            />
            <p className="text-xs">
              Listed to Win : {state.currentGame?.toWin}
            </p>
            <p className="text-xs">Listed Wager : {state.currentGame?.unit}</p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateModal;
