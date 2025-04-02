import styles from "./Dashboard.module.css";
import Header from "../header/Header";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import SettingsIcon from "@mui/icons-material/Settings";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { HeartIcon, ShuffleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";

const SidebarMenu = [
  { title: "Dashboard", icon: DashboardIcon },
  { title: "Practice", icon: RocketLaunchIcon },
  { title: "Insights", icon: InsightsIcon },
  { title: "Settings", icon: SettingsIcon },
];

const Dashboard = () => {
  const [hideSidebar, setHideSidebar] = useState(false);

  const [days, setDays] = useState<string[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const streakDates: string[] = [];

    // Generate today's date and next 6 days
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + i); // Add i days to the current date
      streakDates.push(
        newDate.toLocaleDateString("en-US", { weekday: "narrow" })
      ); // Format the date to 'MM/DD/YYYY'
    }

    setDays(streakDates);
  }, []);

  const handleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  return (
    <div className={styles.dashboard_container}>
      <aside
        className={styles.sidebar}
        style={{
          width: hideSidebar ? "40px" : "300px",
          transition: "width 0.3 ease",
        }}
      >
        <IconButton
          sx={{
            width: "100%",
            display: "inline",
            textAlign: "left",
            paddingTop: "20px",
          }}
          onClick={handleSidebar}
        >
          {/* <Tooltip title="Menu" placement="right"> */}
          {hideSidebar ? (
            <MenuOpenIcon style={{ color: "var(--secondary-color)" }} />
          ) : (
            <MenuIcon style={{ color: "var(--secondary-color)" }} />
          )}
          {/* </Tooltip> */}
        </IconButton>

        {SidebarMenu.map(({ title, icon: IconComponent }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: hideSidebar ? "flex-start" : "center",
            }}
            key={title}
          >
            {hideSidebar ? (
              <Tooltip title={title} placement="right">
                <IconButton>
                  <IconComponent style={{ color: "red" }} />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <IconButton>
                  <IconComponent style={{ color: "red" }} />
                </IconButton>
                <CustomButton
                  label={title}
                  variant="outlined"
                  sx={{
                    padding: {
                      xs: "4px 2px", // Smaller padding on extra-small screens
                      sm: "6px 2px", // Medium padding on small screens
                      md: "8px 2px", // Larger padding on medium screens and up
                    },
                    width: "100%",
                    textAlign: "left",
                    border: "none",
                    display: hideSidebar ? "none" : "block",
                  }}
                />
              </>
            )}
          </div>
        ))}
      </aside>
      <div className={styles.main}>
        <div className={styles.welcome_section}>
          <div className={styles.welcome}>
            <p>Welcome Back!</p>
            <h1>Gokul</h1>
          </div>
          <div className={styles.streak}>
            <h2>Streak</h2>
            <p>Current Streak:</p>
            <h3>1 days</h3>
            <ul className={styles.days}>
              {days.map((day, index) => (
                <li key={index}>
                  <div>
                    <HeartIcon />
                    {day}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.analytics_section}>
          <SelectContent />
          <div className={styles.analytics}></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const SelectContent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedContent, setSelectedContent] = useState<string | null>(null); // To store selected content
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOkay = () => {
    if (selectedContent) {
      // navigate to a page based on the selected content (for example, dynamic/static content page)
      navigate(`${selectedContent.toLowerCase()}`);
    } else {
      alert("Please select a content type before proceeding.");
    }
  };

  return (
    <div>
      <CustomButton
        label="Practice today!"
        variant="contained"
        sx={{ border: "none" }}
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#f0f0f0", // Light grey background for the dialog
            color: "#333", // Text color for the dialog box
          },
        }}
      >
        <DialogTitle>Choose Your Content Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the type of content you would like to practice.
          </DialogContentText>

          {/* Radio Buttons for Content Type Selection */}
          <RadioGroup
            color="error"
            value={selectedContent}
            onChange={(e) => setSelectedContent(e.target.value)}
          >
            <FormControlLabel
              value="static-content-practice"
              control={<Radio color="info" />}
              label="Static Content"
            />
            <FormControlLabel
              value="dynamic-content-practice"
              control={<Radio color="info" />}
              label="Dynamic Content"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleOkay}
            disabled={!selectedContent}
            color="info"
          >
            Okay
          </Button>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
