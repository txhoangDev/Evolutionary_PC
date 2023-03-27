import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Slide,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { getBuild } from "../../../http-common";
import { detailProps } from "../../../types";
import CPU from "../../../assets/images/cpu.png";
import GPU from "../../../assets/images/gpu.png";
import RAM from "../../../assets/images/ram_test.png";
import bg from "../../../assets/backgrounds/parts_bg.svg";

const components: string[] = ["CPU", "GPU", "RAM"];
const descriptions: string[] = [
  "This component is used as the brains of the computer. It understands the instructions given and it will execute the instruction for you. When installing this component do not let the pins bend, otherwise the component will lose function. It should fit right into the motherboard without having to be forced in. Make sure you lift up the tab before trying to install the component. When putting the tab back, you might need a bit of force.",
  "This component is the most well known component in the gaming community. It is what powers your games and makes your games look pretty. Without this component, you would be looking at games without good video settings.When installing this component, you might need a bit of force. Make sure the part lines up with where it is supposed to go on the motherboard before using force to put it in.",
  "This component is known for how many chrome tabs you can have open. In a simpler way, it will determine how fast your computer can access information for your apps. The amount of RAM you need is based on your needs and budget. Don't worry, we got you covered on this one.",
];

const BuildDetailPage: React.FC<detailProps> = (props: detailProps) => {
  const [cpu, setCpu] = React.useState("");
  const [gpu, setGpu] = React.useState("");
  const [ram, setRam] = React.useState("");
  const [budget, setBudget] = React.useState(0);
  const [prices, setPrices] = React.useState<string[]>([]);
  const [component, setComponent] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [image, setImage] = React.useState(CPU);
  const [checked, setChecked] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

  React.useEffect(() => {
    getBuild(props.id).then((res) => {
      if (res !== 'Error') {
        setBudget(Number(res['budget']))
        setCpu(res['cpu']);
        setComponent(res["cpu"]);
        setGpu(res["gpu"]);
        setRam(res["ram"]);
        setPrices([res["cpu_price"], res["gpu_price"], res["ram_price"]]);
      }
    })
    setChecked(true);
  }, [props.id]);

  const handleRight = () => {
    setChecked(false);
    switch (index) {
      case 0:
        setIndex(index + 1);
        setComponent(gpu);
        setImage(GPU);
        break;
      case 1:
        setIndex(index + 1);
        setComponent(ram);
        setImage(RAM);
        break;
      default:
        setIndex(0);
        setComponent(cpu);
        setImage(CPU);
        break;
    }
    setTimeout(function () {
      setChecked(true);
    }, 250);
  };

  const handleLeft = () => {
    setChecked(false);
    switch (index) {
      case 0:
        setIndex(2);
        setComponent(ram);
        setImage(RAM);
        break;
      case 1:
        setIndex(index - 1);
        setComponent(cpu);
        setImage(CPU);
        break;
      default:
        setIndex(index - 1);
        setComponent(gpu);
        setImage(GPU);
        break;
    }
    setTimeout(function () {
      setChecked(true);
    }, 250);
  };

  return (
    <Box
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        zIndex: "-1",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'right', mr: 2 }}>
        Leftover budget: { (budget - Number(prices[0]) - Number(prices[1]) - Number(prices[2])).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </Typography>
      <Grid container spacing={0} style={{ minHeight: "100vh" }}>
        <Grid item container xs={1} md={1} alignItems={"center"}>
          <IconButton size="large" disableRipple onClick={handleLeft}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item container xs={10} md={10} alignItems="center">
          <Grid container spacing={1}>
            <Grid item container xs={12} md={6}>
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                <Box maxWidth="100%">
                  <Box marginBottom={2}>
                    <Typography
                      variant="h3"
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #547793, #F7F2EF)",
                        color: "transparent",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    >
                      {components[index]}
                    </Typography>
                    <Typography
                      variant="h1"
                      sx={{
                        fontWeight: 700,
                        fontSize: 80,
                        wordWrap: "break-word",
                      }}
                    >
                      {component}
                    </Typography>
                  </Box>
                  <Box marginBottom={2}>
                    <Typography variant="h4">{(Number(prices[index])).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Typography>
                  </Box>
                  <Box marginBottom={3}>
                    <Typography
                      variant="h6"
                      component="p"
                      style={{ display: "inline-block" }}
                    >
                      {showMore
                        ? descriptions[index]
                        : `${descriptions[index]
                            .split(" ")
                            .slice(0, 50)
                            .join(" ")}...`}
                      {descriptions[index].split(" ").length > 50 && (
                        <Button onClick={() => setShowMore(!showMore)}>
                          {showMore ? "Less" : "More"}
                        </Button>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            </Grid>
            <Grid item container xs={12} md={6}>
              <Box position="relative" height="100%" width="100%">
                <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                  <Box
                    component="img"
                    loading="lazy"
                    src={image}
                    alt="component"
                    borderRadius={2}
                    sx={{
                      objectFit: "contain",
                    }}
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Slide>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={1} md={1} justifyContent="right">
          <IconButton size="large" disableRipple onClick={handleRight}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BuildDetailPage;
