import { useState } from "react";
import axios from "axios";

const useVehiclesApi = () => {
  const baseURL = "http://localhost:5000/api/vehicles";

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all vehicles
  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(baseURL);
      setVehicles(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new vehicle
  const addVehicle = async (vehicleName, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${baseURL}/add`, {
        vehicleName,
        status,
      });
      setVehicles((prev) => [...prev, response.vehicle]);
      return response.vehicle;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update vehicle status
  const updateVehicleStatus = async (id, vehicleName, status) => {
    console.log("Props: ", id, vehicleName, status);

    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`${baseURL}/${id}`, {
        vehicleName,
        status,
      });
      setVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle._id === id ? { ...vehicle, ...response.vehicle } : vehicle
        )
      );
      console.log("Response: ", response);

      return response.vehicle;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a vehicle
  const deleteVehicle = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${baseURL}/${id}`);
      setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    addVehicle,
    updateVehicleStatus,
    deleteVehicle,
  };
};

export default useVehiclesApi;
