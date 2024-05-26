import {
  useQuery,
  useMutation,
  QueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import axiosInstance from "."; // Adjust the import as necessary
import { toast } from "react-toastify";

// Wrapper for useQuery
export const useQueryWrapper = (
  key: string[],
  url: string,
  options?: UseQueryOptions
) => {
  const getAPICall = async () => {
    const {
      data: { data },
    } = await axiosInstance.get(url);
    return data;
  };
  return useQuery({ queryKey: key, queryFn: getAPICall, ...options });
};

// API call functions
export const postRequest = async ({
  url,
  data,
}: {
  url: string;
  data: any;
}) => {
  const response = await axiosInstance.post(url, data);
  return response?.data || response;
};

export const putRequest = async ({ url, data }: { url: string; data: any }) => {
  const response = await axiosInstance.put(url, data);
  return response?.data || response;
};

export const patchRequest = async ({
  url,
  data,
}: {
  url: string;
  data: any;
}) => {
  const response = await axiosInstance.patch(url, data);
  return response?.data || response;
};

export const deleteRequest = async ({
  url,
  data,
}: {
  url: string;
  data: any;
}) => {
  const config = { data };
  const response = await axiosInstance.delete(url, config);
  return response?.data || response;
};

// Wrapper for useMutation
export const useMutationWrapper = (
  makeAPICall: any,
  onSuccess?: (res: any) => void,
  onError?: (error: any) => void
) => {
  return useMutation({
    mutationFn: makeAPICall,
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(res);
      }
    },
    onError: (error: any) => {
      if (onError) {
        onError(error);
      } else {
        const err = error as Record<any, any>;
        const message: any = err?.response?.data?.message;
        if (Array.isArray(message)) {
          message.map((errorMsg) =>
            toast.error(`${errorMsg ?? "An error occurred"}`, {
              autoClose: false,
            })
          );
        } else {
          toast.error(`${message ?? "An error occurred"}`);
        }
      }
    },
  });
};

// Query client instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 600, // this is in milliseconds
      retry: 0,
    },
  },
});
