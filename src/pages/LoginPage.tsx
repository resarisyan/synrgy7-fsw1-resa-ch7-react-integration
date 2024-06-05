import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useLogin } from '../services/auth';
import { Navigate } from 'react-router';
const LoginPage: React.FC = () => {
  const toast = useToast();
  const { mutate: login } = useLogin();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        login({ username, password });
        toast({
          title: 'Logged in',
          status: 'success',
        });
        <Navigate to="/car" />;
      } catch (error) {
        toast({
          title: 'Failed to login',
          status: 'error',
        });
      }

      formik.resetForm();
    },
  });

  return (
    <Container maxW="container.sm" className="mt-10">
      <h1 className="text-4xl mb-2">Login Page</h1>
      <form onSubmit={formik.handleSubmit}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </FormControl>
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
