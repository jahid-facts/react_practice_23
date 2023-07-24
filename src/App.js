import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const App = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/insert_user', {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    }, config)
      .then((response) => {
        console.log('User added:', response);
        // Clear the form after successful submission
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }).catch(e => {
        console.log(e);
      });

  };

  const UserSchema = Yup.object().shape({
    name: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required('First name'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
      .min(8, 'Password must have at least 8 characters')
      .matches(/[0-9]/, 'Must have a number')
      .matches(/[a-z]/, 'Must have at least one lowercase')
      .matches(/[A-Z]/, 'Must have at least one uppercase')
      .matches(/[!@#%^&*]/, 'Must have at least one special character'),
    confirmPassword: Yup.string().required('Must have a confirm password').oneOf([Yup.ref('password'), null], 'Password does not match'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },

    validationSchema: UserSchema,

    // onSubmit: (values) => {
    //   console.log(values);
    //   // UserDataService.create(values).then...
    // }
  });

  const { errors, touched, isSubmitting } = formik;

  return (
    <Container>
      <Box sx={{ textAlign: 'center' }}>
        <form
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={4}>
            <Grid item sm={5} xs={12}>
              <Typography variant='h5' fontWeight={'bold'} m={'10px'}>Add User</Typography>
              <Stack spacing={3}>
                <TextField
                id="outlined-name-input"
                label="Name"
                type="text"
                autoComplete="current-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField 
                id="outlined-email-input"
                label="Email"
                type="email"
                autoComplete="current-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                id="outlined-confirmPassword-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              </Stack>
              <Typography>
                <Button disabled={isSubmitting} sx={{ margin: '10px' }} variant="outlined" type='submit'>Submit</Button>
              </Typography>
            </Grid>
            <Grid item sm={7} xs={12}>
              <Typography variant='h5' fontWeight={'bold'} mb={'35px'}>User Info</Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>SI</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Number</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows.map((row) => ( */}
                    <TableRow
                      // key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell component="th" scope="row">
                        habib
                      </TableCell>
                      <TableCell>programmer</TableCell>
                      <TableCell>Dhaka</TableCell>
                      <TableCell>012832872</TableCell>
                    </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  )
}

export default App;
