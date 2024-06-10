// "use client";
// import React from "react";
// import {
//   NBAlogos,
//   MLBlogos,
//   NHLlogos,
//   NFLlogos,
// } from "../../../public/SportsTeam";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import toast, { Toaster } from "react-hot-toast";
// import useSWR from "swr";

// const CreatePickMutation = gql`
//   mutation createPick(
//     $homeTeam: String!
//     $awayTeam: String!
//     $homeTeamLogo: String!
//     $awayTeamLogo: String!
//     $pick: String!
//     $unit: Float!
//     $startTime: String!
//     $result: String!
//     $leagueLogo: String!
//   ) {
//     createPick(
//       homeTeam: $homeTeam
//       awayTeam: $awayTeam
//       homeTeamLogo: $homeTeamLogo
//       awayTeamLogo: $awayTeamLogo
//       pick: $pick
//       unit: $unit
//       startTime: $startTime
//       result: $result
//       leagueLogo: $leagueLogo
//     ) {
//       homeTeam
//       awayTeam
//       homeTeamLogo
//       awayTeamLogo
//       pick
//       unit
//       startTime
//       result
//       leagueLogo
//     }
//   }
// `;

// export const fetcher = (...args: Parameters<typeof fetch>) =>
//   fetch(...args).then((res) => res.json());

// type Team = {
//   team: string;
//   logo: string;
// };

// type Sports = "NBA" | "MLB" | "NHL" | "NFL";

// const TeamBySport: { [key in Sports]: Team[] } = {
//   NBA: NBAlogos,
//   MLB: MLBlogos,
//   NHL: NHLlogos,
//   NFL: NFLlogos,
// };

// const leagueLogosArray = [
//   {
//     league: "NBA",
//     logo: "/sportsLogos/NBA.png",
//   },
//   {
//     league: "MLB",
//     logo: "/sportsLogos/MLB.png",
//   },
//   {
//     league: "NFL",
//     logo: "/sportsLogos/NFL.png",
//   },
//   {
//     league: "NHL",
//     logo: "/sportsLogos/NHL.png",
//   },
//   {
//     league: "NCAAB",
//     logo: "/sportsLogos/NCAA.png",
//   },
// ];

// const Form: React.FC = () => {
//   const [selectedSport, setSelectedSport] = React.useState<Sports | null>(null);
//   const [homeTeam, setHomeTeam] = React.useState<string | null>(null);
//   const [awayTeam, setAwayTeam] = React.useState<string | null>(null);
//   const [homeTeamLogo, setHomeTeamLogo] = React.useState<string | null>(null);
//   const [awayTeamLogo, setAwayTeamLogo] = React.useState<string | null>(null);
//   const [unit, setUnits] = React.useState<number | null>(null);
//   const [pick, setPick] = React.useState<string>("");
//   const [startTime, setStartTime] = React.useState<string>("");
//   const [leagueLogo, setLeagueLogo] = React.useState<string>("");
//   const [data, setData] = React.useState();

//   const [createPick, { data:createdPick, loading, error }] =
//     useMutation(CreatePickMutation);

//     const {
//       data: nbaData,
//       error: nbaError,
//       isLoading: nbaLoading,
//     } = useSWR("/api/NBA", fetcher);

//     // const {
//     //   data: nflData,
//     //   error: nflError,
//     //   isLoading: nflLoading,
//     // } = useSWR("/api/NFL", fetcher);

//     const {
//       data: nhlData,
//       error: nhlError,
//       isLoading: nhlLoading,
//     } = useSWR("/api/NHL", fetcher);

//     const {
//       data: mlbData,
//       error: mlbError,
//       isLoading: mlbLoading,
//     } = useSWR("/api/MLB", fetcher);

//     React.useEffect(() => {
//       if (selectedSport === "NBA") {
//         if (nbaLoading) console.log("...loading nba games");
//         else if (nbaError) console.error(nbaError);
//         else setData(nbaData);
//       }

//       // if (selectedSport === "NFL") {
//       //   if (nflLoading) console.log("...loading nfl games");
//       //   else if (nflError) console.error(nflError);
//       //   else setData(nflData);
//       // }

//       if (selectedSport === "NHL") {
//         if (nhlLoading) console.log("...loading nhl games");
//         else if (nhlError) console.error(nhlError);
//         else setData(nhlData);
//       }

//       if (selectedSport === "MLB") {
//         if (mlbLoading) console.log("...loading mlb games");
//         else if (mlbError) console.error(mlbError);
//         else setData(mlbData);
//       }

//       console.log(data);
//     }, [
//       selectedSport,
//       data,
//       nbaLoading,
//       nbaError,
//       nbaData,
//       // nflLoading,
//       // nflError,
//       // nflData,
//       nhlLoading,
//       nhlError,
//       nhlData,
//       mlbLoading,
//       mlbError,
//       mlbData,
//     ]);

//   const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const sport = event.target.value as Sports;
//     setSelectedSport(sport);
//     setHomeTeam(null);
//     setAwayTeam(null);
//     setHomeTeamLogo(null);
//     setAwayTeamLogo(null);

//     const leagueLogo = leagueLogosArray.find(
//       (league) => league.league === sport
//     )?.logo;

//     if (leagueLogo) {
//       console.log(leagueLogo);
//       setLeagueLogo(leagueLogo);
//     } else {
//       console.log("No matching league found for:", sport);
//       setLeagueLogo("/path/to/default/logo.png");
//     }
//   };

//   const handleHomeTeamChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const teamName = event.target.value;
//     const team = TeamBySport[selectedSport!].find(
//       (team) => team.team === teamName
//     );
//     if (team) {
//       setHomeTeam(team.team);
//       setHomeTeamLogo(team.logo);
//     }
//   };

//   const handleAwayTeamChange = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const teamName = event.target.value;
//     const team = TeamBySport[selectedSport!].find(
//       (team) => team.team === teamName
//     );
//     if (team) {
//       setAwayTeam(team.team);
//       setAwayTeamLogo(team.logo);
//     }
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     createPickFunction();
//   };

//   const createPickFunction = async () => {
//     const variables = {
//       homeTeam,
//       awayTeam,
//       homeTeamLogo,
//       awayTeamLogo,
//       pick,
//       unit,
//       startTime,
//       result: "Incomplete",
//       leagueLogo,
//     };

//     try {
//       console.log("variables", variables);
//       createPick({ variables })
//         .then((response) => {
//           console.log("Pick Created:", response.data.createPick);
//         })
//         .catch((err) => {
//           console.error("Error creating pick:", err);
//         });
//       // const newPick = await createPick({ variables });
//       // console.log(newPick);
//     } catch (error) {
//       console.log(error);
//       toast.error("Error has occured");
//     }
//   };

//   return (
//     <div className="container mx-auto max-w-md p-4">
//       <h2 className="text-lg font-semibold mb-2">Add a Pick</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="sport"
//             className="block text-gray-700 font-medium mb-2"
//           >
//             Sport
//           </label>
//           <select
//             id="sport"
//             className="form-select w-full text-black"
//             value={selectedSport || ""}
//             onChange={handleSportChange}
//           >
//             <option value="">Select a sport</option>
//             {Object.keys(TeamBySport).map((sport) => (
//               <option key={sport} value={sport}>
//                 {sport}
//               </option>
//             ))}
//           </select>
//         </div>
//         {selectedSport && (
//           <>
//             <div className="mb-4">
//               <label
//                 htmlFor="homeTeam"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Home Team
//               </label>
//               <select
//                 id="homeTeam"
//                 className="form-select w-full text-black"
//                 value={homeTeam || ""}
//                 onChange={handleHomeTeamChange}
//               >
//                 <option value="">Select a home team</option>
//                 {TeamBySport[selectedSport].map((team) => (
//                   <option key={team.team} value={team.team}>
//                     {team.team}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="awayTeam"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Away Team
//               </label>
//               <select
//                 id="awayTeam"
//                 className="form-select w-full text-black"
//                 value={awayTeam || ""}
//                 onChange={handleAwayTeamChange}
//               >
//                 <option value="">Select an away team</option>
//                 {TeamBySport[selectedSport].map((team) => (
//                   <option key={team.team} value={team.team}>
//                     {team.team}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="units"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Units
//               </label>
//               <input
//                 type="number"
//                 id="units"
//                 className="form-input w-full text-black"
//                 value={unit || ""}
//                 onChange={(e) => setUnits(parseInt(e.target.value))}
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="pick"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Pick
//               </label>
//               <input
//                 type="text"
//                 id="pick"
//                 className="form-input w-full text-black"
//                 value={pick}
//                 onChange={(e) => setPick(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="startTime"
//                 className="block text-gray-700 font-medium mb-2"
//               >
//                 Start Time
//               </label>
//               <input
//                 type="text"
//                 id="startTime"
//                 className="form-input w-full text-black"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//               />
//             </div>
//           </>
//         )}
//         {/* Store selected home and away team logos in the form */}
//         <input type="hidden" name="homeTeamLogo" value={homeTeamLogo || ""} />
//         <input type="hidden" name="awayTeamLogo" value={awayTeamLogo || ""} />
//         <div className="mb-4">
//           <button
//             type="submit"
//             className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
//           >
//             Create Pick
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Form;
