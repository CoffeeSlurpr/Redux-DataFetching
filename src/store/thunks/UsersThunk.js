import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get("http://localhost:3005/users");

  await pause(500);

  return response.data;
});

export const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: faker.name.firstName(),
  });

  await pause(500);

  return response.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (user) => {
  await axios.delete(`http://localhost:3005/users/${user.id}`);

  await pause(500);

  return user;
});

const pause = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
