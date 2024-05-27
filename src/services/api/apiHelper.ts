import {
  useQuery,
  useMutation,
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import axiosInstance from ".";
import { toast } from "react-toastify";

// Wrapper for useQuery
export const useQueryWrapper = (
  key: string[],
  url: string,
  onSuccess,
  onError?,
  options?: any
): UseQueryResult => {
  const getAPICall = async () => {
    try {
      const res = await axiosInstance.get(url);
      onSuccess(res.data);
      return res.data;
    } catch (error: any) {
      if (onError) {
        onError(error.response.data);
      }
      return error;
    }
  };
  return useQuery({ queryKey: key, queryFn: getAPICall, ...options });
};

// API call functions
export const getRequest = async ({ url }: { url: string }) => {
  const response = await axiosInstance.get(url);
  return response?.data || response;
};
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

export const deleteRequest = async ({ url }: { url: string }) => {
  const response = await axiosInstance.delete(url);
  return response?.data || response;
};

// Wrapper for useMutation
export const useMutationWrapper = <TData = any, TVariables = any>(
  makeAPICall: (args: TVariables) => Promise<TData>,
  onSuccess?: (data: TData) => void,
  onError?: (error: any) => void,
  options?: UseMutationOptions<TData, any, TVariables>
): UseMutationResult<TData, any, TVariables> => {
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
        const message: any = err?.response?.data?.error;
        if (Array.isArray(message)) {
          message.forEach((errorMsg) =>
            toast.error(`${errorMsg ?? "An error occurred"}`, {
              autoClose: false,
            })
          );
        } else {
          toast.error(`${message ?? "An error occurred"}`);
        }
      }
    },
    ...options,
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
