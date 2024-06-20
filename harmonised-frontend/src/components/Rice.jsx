// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

// const riceData = {
//   name: "Rice",
//   pestsDiseases: [
//     {
//       name: "Rice insect pests",
//       symptoms: [
//         "Common insects are grasshoppers (bwanoni), short fly and army worm, rice keeper, mole cricket, ant and armyworm."
//       ],
//       control: "Control by early sowing, maintaining, weed-free, applying carbarbly, cypermetrine, and fenitrothhion.",
//       image: "rice_4.jpg"
//     },
//     {
//       name: "Sheath Blight",
//       symptoms: [
//         "Symptoms are observed from tillering to milk stage.",
//         "In intensified rice production systems it causes a yield loss of 6%."
//       ],
//       control: "Plant resistant varieties, avoid planting infected seed and applying mancozeb and carbendazim.",
//       image: "rice_5.jpg"
//     },
//     {
//       name: "Bacterial blight",
//       symptoms: [
//         "Affects rice at seedling stage.",
//         "Symptoms: infected leaves turn grayish green and roll up.",
//         "In adverse conditions leaves turn yellow to straw-colored and wilt leading whole seedlings to dry up and die."
//       ],
//       control: "The disease is treated by nitrogen fertilizers.",
//       image: "rice_7.jpg"
//     },
//     {
//       name: "Rice blast",
//       symptoms: [
//         "It is caused by fungus.",
//         "The disease is common in Nkhata Bay.",
//         "Symptoms; it produces so may pathogenic races which tend to differ in terms of varieties."
//       ],
//       control: "It can best be controlled by planting resistant varieties.",
//       image: "rice_8.jpg"
//     },
//     {
//       name: "Sheath rot",
//       symptoms: [
//         "It is caused by virus and identified.",
//         "Symptoms it is observed by rotted growing panicle being incompletely exerted with numerous empty grains."
//       ],
//       control: [
//         "The disease can be managed by planting resistant varieties.",
//         "To eradicate seed-borne pathogens use mancozeb an benomyl for seed treatment."
//       ],
//       image: "rice_9.jpg"
//     },
//     {
//       name: "Yellow Mottle Virus (RYMV)",
//       symptoms: [
//         "It is caused by a virus.",
//         "Symptoms: stunted plants, and reduced tillering, mottling, yellowish streaking of leaves, malformation and panicle partial emergency.",
//         "Severe infected by plats die."
//       ],
//       control: "Planting Resistant varieties.",
//       image: "rice_10.jpg"
//     }
//   ]
// };

// const RicePestDisease = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to handle navigation back to the previous page
//   const handleBack = () => {
//     navigate(-1); // Navigate back one step in the history stack
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-semibold mb-2">
//         {/* Back button */}
//         <button className="back-button" onClick={handleBack}>
//           {/* Back symbol (arrow icon) */}
//           {/* &#8592; */}
//         </button>
//         {riceData.name}
//       </h2>
//       {riceData.pestsDiseases.map((item) => (
//         <div key={item.name} className="mb-4 p-4 border rounded-lg flex items-center">
//           {item.image && (
//             <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
//           )}
//           <div>
//             <h3 className="text-xl font-bold">{item.name}</h3>
//             <div className="ml-4">
//               <h4 className="font-semibold">Symptoms:</h4>
//               <ul className="list-disc list-inside">
//                 {item.symptoms.map((symptom, index) => (
//                   <li key={index}>{symptom}</li>
//                 ))}
//               </ul>
//               <h4 className="font-semibold mt-2">Control:</h4>
//               {Array.isArray(item.control) ? (
//                 <ul className="list-disc list-inside">
//                   {item.control.map((controlItem, index) => (
//                     <li key={index}>{controlItem}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>{item.control}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RicePestDisease;
