import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

export const useDeleteCar = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (id: string) => {
      const carResponse = await axiosInstance.delete(`/car/${id}`);

      return carResponse;
    },
    onSuccess,
  });
};
