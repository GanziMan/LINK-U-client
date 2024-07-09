import { Box, TextField, TextareaAutosize, styled } from "@mui/material";
import { motion } from "framer-motion";

export const InvitaionContainer = styled(Box)(() => {
  return {
    width: "100%",
    color: "#594739",
    background: "#f1e0ce",
    display: "flex",
    justifyContent: "center",
  };
});

export const InvitaionWrapper = styled(Box)(() => {
  return {
    padding: "50px 20px 50px 20px",
    width: 390,
    gap: "30px",
    background: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
});

export const WeddingImageWrapper = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };
});

export const WeddingImageText = styled(Box)(() => {
  return {
    fontSize: "14px",
    fontFamily: "judson",
  };
});

export const InviteText = styled(Box)(() => {
  return {
    color: "#594739",
    width: 203,
    wordBreak: "keep-all",
    whiteSpace: "pre-line",
    fontSize: "16px",
    lineHeight: "30px",
    textAlign: "center",
  };
});

export const DivideLine = styled(Box)(() => {
  return {
    width: 95,
    borderBottom: "1px solid black",
  };
});
export const ParentText = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
});

export const LocationText = styled(Box)(() => {
  return {
    fontSize: "14px",
    lineHeight: "30px",
    width: 225,
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "pre-line",
    wordBreak: "keep-all",
  };
});

export const AccountBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

export const AccountBoxText = styled(Box)(() => {
  return {
    fontSize: "14px",
    color: "#775F4C",
  };
});

export const KakaoMapButton = styled(Box)(() => {
  return {
    background: "rgb(243, 235, 220)",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "26px",
    height: 38,
    width: "100%",
  };
});

export const GuideBox = styled(Box)(() => {
  return {
    color: "#D67E2C",
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: 700,
  };
});

export const ShareBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };
});

export const ShareButton = styled(Box)(({
  background,
}: {
  background: string;
}) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(70, 65, 61)",
    background: background,
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "26px",
    width: 230,
    height: 46,
    borderRadius: "100px",
    fontWeight: 600,
  };
});

export const HeartBox = styled(Box)(() => {
  return {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

export const HeartCountBox = styled(Box)(() => {
  return {
    position: "absolute",
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 700,
    color: "white",
  };
});

export const LocationTextBox = styled(Box)(() => {
  return {
    fontSize: "14px",
    lineHeight: "26px",
  };
});

export const LocationNameBox = styled(Box)(() => {
  return {
    fontSize: "18px",
    lineHeight: "26px",
    fontWeight: 700,
    color: "rgb(49, 46, 42)",
  };
});

export const VisitorBox = styled(Box)(() => {
  return {
    fontSize: "28px",
    lineHeight: "32px",
  };
});

export const CommentContainer = styled(Box)(() => {
  return {
    borderRadius: "4px",
    border: "1px solid #f1e0ce",
    width: "100%",
  };
});

export const CommentWrapper = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    width: "100%",
    padding: "20px",
    borderBottom: "0.5px solid #f1e0ce",
  };
});

export const CommentNameBox = styled(Box)(() => {
  return {
    fontSize: "12px",
    lineHeight: "20px",
    fontFamily: "judson",
    fontWeight: 700,
  };
});

export const CommentContentBox = styled(Box)(() => {
  return {
    fontSize: "14px",
    lineHeight: "22px",
    fontFamily: "judson",
  };
});

export const CommentDateBox = styled(Box)(() => {
  return {
    fontSize: "11px",
    lineHeight: "16px",
    fontFamily: "judson",
    marginLeft: "auto",
  };
});
export const CommentWriteBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
    width: "100%",
  };
});

export const CommentWriteNameBox = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px",
  };
});

export const CommentWriteTextBox = styled(TextField)(() => {
  return {
    "& .MuiOutlinedInput-root fieldset": {
      border: "1px solid #f1e0ce",
    },

    // "&.MuiInputLabel-root": {
    //   top: "50%",
    //   transform: "translateY(-50%)",
    // },
    // ".MuiInputBase-root": {
    //   alignItems: "center",
    // },
    // ".MuiInputLabel-shrink": {
    //   top: 0,
    //   transform: "translate(0, -100%)",
    // },
  };
});

export const CommentWriteContentBox = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px",
  };
});

export const CommentWriteTextAreaBox = styled(TextareaAutosize)(() => {
  return {
    width: "100%",
    height: 1000,
    border: "1px solid #f1e0ce",
    borderRadius: "4px",
    padding: "16.5px 14px",
  };
});

// motion으로 감싸는 컴포넌트를 생성합니다.
export const MotionBox = motion(Box);
