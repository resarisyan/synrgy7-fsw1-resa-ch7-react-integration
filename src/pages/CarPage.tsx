import {
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  ButtonGroup,
  Button,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import {
  useCreateCar,
  useDeleteCar,
  useEditCar,
  useFetchCars,
} from '../services/cars';
import { CarType } from '../utils/types/CarType';
import { useFormik } from 'formik';

export default function CarPage() {
  const toast = useToast();

  const {
    data: cars,
    isLoading: carIsLoading,
    refetch: refetchCars,
  } = useFetchCars();

  const { mutate: deleteProduct } = useDeleteCar({
    onSuccess: () => {
      refetchCars();
    },
  });

  const formik = useFormik<CarType>({
    initialValues: {
      id: '',
      plate: '',
      manufacture: '',
      model: '',
      image: '',
      rentPerDay: 0,
      capacity: 0,
      description: '',
      transmission: '',
      year: 0,
    },
    onSubmit: async (values) => {
      const {
        id,
        plate,
        manufacture,
        model,
        image,
        rentPerDay,
        capacity,
        description,
        transmission,
        year,
      } = values;

      if (id) {
        await editCar({
          id,
          plate,
          manufacture,
          model,
          image,
          rentPerDay: parseInt(rentPerDay.toString()),
          capacity: parseInt(capacity.toString()),
          description,
          transmission,
          year: parseInt(year.toString()),
        });

        toast({
          title: 'Car updated',
          status: 'success',
        });
      } else {
        await createCar({
          plate,
          manufacture,
          model,
          image,
          rentPerDay: parseInt(rentPerDay.toString()),
          capacity: parseInt(capacity.toString()),
          description,
          transmission,
          year: parseInt(year.toString()),
        });

        toast({
          title: 'Car added',
          status: 'success',
        });
      }

      formik.resetForm();
    },
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result);
      };
    }
  };

  const { mutate: editCar } = useEditCar({
    onSuccess: () => {
      refetchCars();
    },
  });

  const { mutate: createCar } = useCreateCar({
    onSuccess: () => {
      refetchCars();
    },
  });

  const confirmationDelete = (carId: string) => {
    const shouldDelete = confirm('Are you sure?');

    if (shouldDelete) {
      deleteProduct(carId);
      toast({
        title: 'Deleted product',
        status: 'info',
      });
    }
  };

  const onEditClick = (car: CarType) => {
    formik.setFieldValue('id', car.id);
    formik.setFieldValue('plate', car.plate);
    formik.setFieldValue('manufacture', car.manufacture);
    formik.setFieldValue('image', null);
    formik.setFieldValue('model', car.model);
    formik.setFieldValue('rentPerDay', car.rentPerDay);
    formik.setFieldValue('capacity', car.capacity);
    formik.setFieldValue('description', car.description);
    formik.setFieldValue('transmission', car.transmission);
    formik.setFieldValue('year', car.year);
  };

  const renderCars = () => {
    return cars?.data.map((car: CarType) => (
      <Tr key={car.id}>
        <Td>{car.description}</Td>
        <Td>
          <img src={car.image} alt={car.id} />
        </Td>
        <Td>{car.plate}</Td>
        <Td>{car.manufacture}</Td>
        <Td>{car.model}</Td>
        <Td>{car.rentPerDay}</Td>
        <Td>{car.capacity}</Td>
        <Td>{car.transmission}</Td>
        <Td>{car.year}</Td>
        <Td>
          <ButtonGroup>
            <Button onClick={() => onEditClick(car)} colorScheme="cyan">
              Edit
            </Button>
            <Button
              onClick={() => confirmationDelete(car.id as string)}
              colorScheme="red"
            >
              Delete
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
    ));
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <Heading>Car Page</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Image</Th>
              <Th>Plate</Th>
              <Th>Manufacture</Th>
              <Th>Model</Th>
              <Th>Rent Per Day</Th>
              <Th>Capacity</Th>
              <Th>Transmission</Th>
              <Th>Year</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {renderCars()}
            {carIsLoading && <Spinner />}
          </Tbody>
        </Table>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
            <VStack spacing="4">
              <FormControl className="hidden">
                <FormLabel>Car ID</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="id"
                  value={formik.values.id}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Plate</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="plate"
                  value={formik.values.plate}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Manufacture</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="manufacture"
                  value={formik.values.manufacture}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="model"
                  value={formik.values.model}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Rent Per Day</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="rentPerDay"
                  type="number"
                  value={formik.values.rentPerDay}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Capacity</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="capacity"
                  type="number"
                  value={formik.values.capacity}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="description"
                  value={formik.values.description}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Transmission</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="transmission"
                  value={formik.values.transmission}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  onChange={formik.handleChange}
                  name="year"
                  type="number"
                  value={formik.values.year}
                />
              </FormControl>
              <Button type="submit">Submit Car</Button>
            </VStack>
          </form>
        </div>
      </main>
    </>
  );
}
