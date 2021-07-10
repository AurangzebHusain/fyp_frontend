import {
  Box,
  Button,
  Checkbox,
  makeStyles,
  TextField,
  Typography,
  MenuItem,
  Container,
} from "@material-ui/core";
import React, { useState } from "react";
import logo from "../../easycart-t.png";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  flexCenterEvenly: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexColumn: {
    flexDirection: "column",
  },
});

let initialState = {
  fullName: "",
  userEmail: "",
  userMobile: "",
  userPassword: "",
  checked: false,
  shopName: "",
  shopAddress: "",
  vendorState: "",
  shopType: "",
  description: "",
};

function VendorDetails() {
  const classes = useStyles();
  const [vendorDetails, setVendorDetails] = useState(initialState);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vendorDetails);
    setVendorDetails(initialState);
    history.push("/");
  };

  return (
    <Container maxWidth={"lg"} style={{ padding: "20px 0px" }}>
      <Link
        to={"/"}
        style={{ width: "100%" }}
        className={classes.flexCenterEvenly}>
        <img className='login__logo' src={logo} alt='brand-logo' />
      </Link>
      <Typography
        align={"center"}
        gutterBottom
        variant={"h2"}
        color={"secondary"}>
        {"Vendor Registration Form"}
      </Typography>
      <Link
        to={"/signin"}
        style={{ width: "100%" }}
        className={classes.flexCenterEvenly}>
        <Typography
          variant={"subtitle2"}
          gutterBottom
          color={"primary"}
          align={"center"}>
          {"Already registered, Login"}
        </Typography>
      </Link>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        height={"fit-content"}
        padding={1}>
        <Typography
          align={"center"}
          variant={"h4"}
          color={"primary"}
          gutterBottom>
          {"Personal Details"}
        </Typography>
        <Box maxWidth={"800px"}>
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{ textAlign: "center" }}>
            <TextField
              label={"Full Name"}
              value={vendorDetails.fullName}
              onChange={(e) =>
                setVendorDetails({ ...vendorDetails, fullName: e.target.value })
              }
              variant={"outlined"}
              color={"primary"}
              margin={"normal"}
              fullWidth
              required
            />
            <TextField
              label={"Email"}
              value={vendorDetails.userEmail}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  userEmail: e.target.value,
                })
              }
              type={"email"}
              variant={"outlined"}
              color={"primary"}
              margin={"normal"}
              fullWidth
              required
            />
            <TextField
              label={"Mobile Number"}
              value={vendorDetails.userMobile}
              type={"number"}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  userMobile: e.target.value,
                })
              }
              variant={"outlined"}
              color={"primary"}
              margin={"normal"}
              fullWidth
              required
            />
            <TextField
              label={"Create Password"}
              value={vendorDetails.userPassword}
              type={"password"}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  userPassword: e.target.value,
                })
              }
              variant={"outlined"}
              color={"primary"}
              margin={"normal"}
              fullWidth
              required
            />
            <Typography
              align={"center"}
              variant={"h4"}
              color={"primary"}
              gutterBottom>
              {"Company Details"}
            </Typography>
            <TextField
              label={"Shop Name"}
              variant={"outlined"}
              color={"primary"}
              value={vendorDetails.shopName}
              onChange={(e) =>
                setVendorDetails({ ...vendorDetails, shopName: e.target.value })
              }
              margin={"normal"}
              fullWidth
              required
            />
            <TextField
              label={"Shop Address"}
              variant={"outlined"}
              color={"primary"}
              margin={"normal"}
              value={vendorDetails.shopAddress}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  shopAddress: e.target.value,
                })
              }
              fullWidth
              required
            />
            <TextField
              label={"State"}
              variant={"outlined"}
              color={"primary"}
              value={vendorDetails.vendorState}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  vendorState: e.target.value,
                })
              }
              margin={"normal"}
              fullWidth
              required
              select>
              <MenuItem value={"up"}> {"UP"} </MenuItem>
              <MenuItem value={"delhi"}> {"Delhi"} </MenuItem>
              <MenuItem value={"gujarat"}> {"Gujarat"} </MenuItem>
            </TextField>
            <TextField
              label={"Shop Type"}
              type={"number"}
              variant={"outlined"}
              color={"primary"}
              value={vendorDetails.shopType}
              onChange={(e) =>
                setVendorDetails({ ...vendorDetails, shopType: e.target.value })
              }
              margin={"normal"}
              fullWidth
              required
              select
              placeholder={"Select Type of shop"}>
              <MenuItem value={"someValue"}> {"Type1"} </MenuItem>
              <MenuItem value={"someValue"}> {"Type1"} </MenuItem>
              <MenuItem value={"someValue"}> {"Type1"} </MenuItem>
            </TextField>
            <TextField
              rows={2}
              rowsMax={Infinity}
              multiline
              label={"Other Details"}
              variant={"outlined"}
              value={vendorDetails.description}
              onChange={(e) =>
                setVendorDetails({
                  ...vendorDetails,
                  description: e.target.value,
                })
              }
              color={"primary"}
              margin={"normal"}
              fullWidth
            />
            <Box margin={"10px 0px"} className={classes.flexCenterEvenly}>
              <Checkbox
                checked={vendorDetails.checked}
                onChange={() =>
                  setVendorDetails({
                    ...vendorDetails,
                    checked: !vendorDetails.checked,
                  })
                }
                color={"primary"}
                required
              />
              <Typography
                color={"textSecondary"}
                variant={"caption"}
                align={"left"}>
                {
                  "By checking this box I confirm that the information provided in this form is true, complete and accurate."
                }
              </Typography>
            </Box>
            <Button type={"submit"} variant={"contained"} color={"primary"}>
              {"Register"}
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default VendorDetails;
