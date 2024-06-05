import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { CarType } from '../../utils/types/CarType';

export const useEditCar = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: async (body:CarType) => {
      console.log('body', body);
      const carResponse = await axiosInstance.put(`/car/${body.id}`, body);
      return carResponse;
    },
    onSuccess,
  });
};
