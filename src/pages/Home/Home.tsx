import { Button, TextField, Typography } from "@mui/material";
import sportygalaxyLogo from "/sportygalaxy-logo.svg";
import { Activity, ActivityHeart, SearchMd } from "@untitled-ui/icons-react";
import MultiStepForm from "@/common/MultistepForm/MultistepForm";

const Home = () => {
  return (
    <main className="container-wrapper">
      <MultiStepForm />
      <div>
        <img src={sportygalaxyLogo} className="logo" alt="Vite logo" />
      </div>
      <h1 className="text-5xl font-extrabold font-crimson">Vite + React</h1>
      <Typography variant="h1">Vite + React</Typography>
      <Button variant="link">Primary Button</Button>
      <Button variant="outlined-error" size="small">
        Custom Primary Button
      </Button>
      <Button size="medium" variant="ghost">
        Secondary Button
      </Button>
      <Button variant="contained-error" size="large">
        Custom Secondary Button
      </Button>
      <TextField
        disabled
        className="MuiTextFieldOutlined--plain"
        //  label="Confirm Password"
        placeholder="Enter name"
      />
      <SearchMd />
      <Activity
        strokeWidth={2}
        color="red"
        width={24}
        height={24}
        className="bg-black"
        fill="none"
      />
      <ActivityHeart
        color="green"
        strokeWidth={2}
        width={100}
        height={100}
        className="bg-green-900"
        fill="#aaa" // none
        fillOpacity={2}
      />
    </main>
  );
};

export default Home;
