/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types/users";
import axios from "axios";
import { endpoints } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IResult } from "@/types";

export const useUser = () => {
  return useQuery<IResult<User>>({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get<IResult<User>>(endpoints.readUser);
      return data;
    },
  });
};

export const useUpsertUser = () => {
  return useMutation({
    mutationFn: async (params: User) => {
      console.log("Request payload:", params);

      const { data } = await axios.post<IResult<any>>(
        endpoints.upsertUser,
        params
      );
      return data;
    },
  });
};
