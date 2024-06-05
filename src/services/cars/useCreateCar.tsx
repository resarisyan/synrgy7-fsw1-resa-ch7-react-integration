import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { CarType } from '../../utils/types/CarType';
export const useCreateCar = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body:CarType) => {
      const carResponse = await axiosInstance.post('/car', body);

      return carResponse;
    },
    onSuccess,
  });
};
