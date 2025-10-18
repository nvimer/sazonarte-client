/**
 * PROFILE API SERVICE
 *
 * Services related to the user profile
 * Base endpoints: /profile/*
 */
import type { ProfileMeResponse } from "@/types";
import axiosClient from "./axiosClient";

/**
 * GET /profile/me
 *
 * Gets the data of the current authenticated user
 *
 * @returns Complete user with profile
 */
export const getMyProfile = async () => {
  const { data } = await axiosClient.get<ProfileMeResponse>("profile/me");
  return data;
};
