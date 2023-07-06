const bikeModels: { [key: string]: string } = {
    "road_bike": "Road Bike",
    "mountain_bike": "Mountain Bike",
    "fixed_gear": "Fixed Gear",
    "touring_bike": "Touring Bike",
    "cruiser": "Cruiser"
}

export default function getFormattedBikeModel(model: string) {
    return bikeModels[model];
};