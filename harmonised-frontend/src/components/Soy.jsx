// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

// // Define the data for soybeans pests and diseases including image URLs
// const soybeansData = {
//   name: "Soy Beans",
//   pestsDiseases: [
//     {
//       name: "Caterpillars",
//       image: "soy_2.png", 
//       symptoms: [
//         "Soybean lopper, leaf miners, leaf rollers.",
//         "These insect pests feed on the foliage.",
//         "They reduce the plant photosynthetic area thereby affecting final yield."
//       ],
//       control: "Once insecticide application is usually enough to control insect attacks. Can also be controlled by applying Tephrosia Vogelii (Fish bean) seeds and leaves which are a good local insecticide."
//     },
//     {
//       name: "Termite",
//       image: "soy_3.jpg", 
//       symptoms: [
//         "Can attack soybean plants at any stage of development from seed to mature soybean plant particularly when there is prolonged dry spell.",
//         "First sign of termite attack is wilting leading to death or falling over of plants.",
//         "Pull out affected plants to examine roots and lower stem for live termites and/or tunneling.",
//         "Plant roots and stems may be completely hollowed out and soil-filled.",
//         "Damage by termites is greater in rain-fed than irrigated crop, dry periods than periods of regular rainfall, lowland rather than highland areas, and in plants under stress rather than in healthy and vigorous plants.",
//         "Plants can be under stress from weeds competing with crops for nutrients, light and water, hence increasing susceptibility to termite attack."
//       ],
//       control: "Crop rotation and removal of other debris from the field reduces build-up of termites, reduces potential termite food supplies, thus reducing termite number and subsequent attack."
//     },
//     {
//       name: "Soybean Rust",
//       image: "soy_4.png",
//       symptoms: [
//         "The only disease of economic importance.",
//           "Other diseases such as frogeye, bacterial pastule, red lead blotch occur but are less important economically.",
//           "Asian soybean rust, caused by Phakapsora pachyrhizi, is one of the notable foliar soybean diseases in Malawi.",
//           "Infected leaves have small tan to dark brown or reddish-brown lesions on which small raised pustules (or bumps) occur on the lower surface of the leaves.",
//           "Pustules produce a large number of spores.",
//           "Brown or rust-colored powder falls when severely infected leaves are tapped over a white paper or cloth.",
//           "Severe infection leads to premature defoliation and yield losses up to 80%.",
//           "Soybean rust is of great economic importance where humidity and rainfall are high.",
//           "Late planted soybean is prone to soybean rust infection."
//       ]
//     },
//     {
//       name: "Soybean cyst nematode (SCN), Heterodera glycines",
//       image: "soy_6.jpg",
//       symptoms: [
//         "It can be present in the field without causing obvious above-ground symptoms.",
//         "In heavily infested fields, SCN can cause yield losses of more than 30%.",
//         "Infested plants become stunted, canopy closure does not occur, leaves become chlorotic; however, these symptoms may also be caused by other crop stresses such as nutrient deficiencies.",
//         "Severely infected plants may die before flowering, especially during dry periods where soils have poor water holding capacity."
//       ],
//       control: [
//         "Ensure good soil fertility and adequate moisture increase tolerance and reduce the severity of above-ground symptoms in fields.",
//         "Employ good crop production practices to reduce severity of nematode infestation; for instance, a 1 to 2-year rotation with Maize or cotton (non-hosts) has proven effective for many soybean growers.",
//         "Use resistant varieties such as Ocepara 4."
//       ]
//     },
//     {
//         name: "Pod-sucking buds",
//         image: "soy_8.jpg",
//         symptoms: [
//           "Attack crop from flowering onwards."
//         ],
//         control: "Insect pests can be controlled with a single spray of Cypermethrin + Dimethoate 10 EC. Read the chemical label for instructions."
//       },
//     {
//       name: "Virus diseases",
//       image: "soy_9.jpg",
//       symptoms: [
//         "Commonly transmitted by insects such as whitefly.",
//         "Symptoms range from mosaic and mottling, leaf curling, green vein banding, and stunting.",
//         "Foliar symptoms of virus infection include mosaic and mottling, thickening or brittling of older leaves, puckering, leaf distortion, severe reduction in leaf size, and stunting of plants."
//       ],
//       control: "Remove and burn infected plants."
//     },
//     {
//       name: "General Control of Soybean diseases",
//       image: "soy_7.png",
//       control: [
//         "Use certified seed to avoid seed-borne infection.",
//         "Use varieties resistant to prevailing diseases of the area.",
//         "Plant early to escape diseases that come late in the season and to encourage good establishment of soybean plant to withstand disease attack.",
//         "Avoid planting seeds obtained from mosaic affected plants.",
//         "Uproot and destroy symptomatic plants.",
//         "Do not use seed that is cracked or broken; take care during harvesting and handling to reduce mechanical damage.",
//         "Rotate soybeans with non-host crops such as Maize or sorghum.",
//         "Eradicate weeds and voluntary plants in the vicinity of soybeans sites as these act as host agents."
//       ]
//     }
//   ]
// };

// const SoybeansPestDisease = () => {
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
//         {soybeansData.name}
//       </h2>
//       {soybeansData.pestsDiseases.map((item) => (
//         <div key={item.name} className="mb-4 p-4 border rounded-lg flex">
//           {item.image && (
//             <img src={item.image} alt={item.name} className="h-32 w-32 object-cover mr-4 rounded-lg" />
//           )}
//           <div>
//             <h3 className="text-xl font-bold">{item.name}</h3>
//             <div className="ml-4">
//               {item.symptoms && (
//                 <>
//                   <h4 className="font-semibold">Symptoms:</h4>
//                   <ul className="list-disc list-inside">
//                     {item.symptoms.map((symptom, index) => (
//                       <li key={index}>{symptom}</li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//               {item.control && (
//                 <>
//                   <h4 className="font-semibold mt-2">Control:</h4>
//                   {Array.isArray(item.control) ? (
//                     <ul className="list-disc list-inside">
//                       {item.control.map((controlItem, index) => (
//                         <li key={index}>{controlItem}</li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>{item.control}</p>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SoybeansPestDisease;
