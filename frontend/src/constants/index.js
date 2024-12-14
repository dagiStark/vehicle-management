import { Logs, Car } from "lucide-react";

export const navItems = [
  {
    name: "Overview",
    path: "/overview",
    icon: Logs,
  },
  {
    name: "Vehicles",
    path: "/vehicles",
    icon: Car,
  },
];

export const dummyData = [
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
  { name: "Toyota", status: "Active", lastUpdate: "2023-01-01" },
];

export const fakeData = [
  {
    id: "1",
    vehicleName: "Toyota",
    status: "Active",
    lastUpdate: "2023-01-01",
  },
  {
    id: "2",
    vehicleName: "Toyota",
    status: "Active",
    lastUpdate: "2023-01-01",
  },
  {
    id: "3",
    vehicleName: "Toyota",
    status: "Active",
    lastUpdate: "2023-01-01",
  },
  {
    id: "4",
    vehicleName: "Toyota",
    status: "Active",
    lastUpdate: "2023-01-01",
  },
];

export const usStates = [
  { value: "received", label: "Received" },
  { value: "maintaining", label: "Maintaining" },
  { value: "delivered", label: "Delivered" },
  { value: "trashed", label: "Trashed" },
];

export const transactionData = [
  {
    name: "Toyota Corolla",
    status: "completed",
    plate: "24088",
    date: "Jul 12th 2024"
  },
  {
    name: "Suv Classic",
    status: "pending",
    plate: "24088",
    date: "Jul 12th 2024"
  },
  {
    name: "Maserati GranTurismo",
    status: "completed",
    plate: "24088",
    date: "Jul 12th 2024"
  },
  {
    name: "Tata G-40",
    status: "completed",
    plate: "24088",
    date: "Jul 12th 2024"
  },
  {
    name: "G-Wagon",
    status: "pending",
    plate: "24088",
    date: "Jul 12th 2024"
  },
  {
    name: "Toyota Yaris",
    status: "pending",
    plate: "24088",
    date: "Jul 12th 2024"
  },
]