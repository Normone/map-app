// import React, {Component} from 'react';
// import Map from '../Map';
// import Event from '../Event';
// import locationsData from '../../data/locations.json';


// class Locations extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         currentLocation: null,
//         locations: []
//         };
//     }

//     componentDidMount() {
//         const template = JSON.parse(localStorage.getItem('gameTemplate'));

//         if (template && template.currentLocation) {
//         // Ищем объект локации по currentLocation
//             const location = locationsData.find(loc => loc.id === template.currentLocation.id);
//             this.setState({ currentLocation: location });
//         }

//         this.setState({ locations: locationsData });
//     }

//     handleLocationClick = location => {
//         this.setState({ currentLocation: location });
//     };

//     render() {
//         const { currentLocation, locations } = this.state;

//         return (
//         <div>
//             <h2>Locations</h2>
//             <ul>
//             {locations.map(location => (
//                 <li key={location.id} onClick={() => this.handleLocationClick(location)}>
//                 {location.name}
//                 </li>
//             ))}
//             </ul>
//             {currentLocation && (
//             <div>
//                 <Map location={currentLocation} />
//                 <Event location={currentLocation} />
//             </div>
//             )}
//         </div>
//         );
//     }
// }

// export default Locations;