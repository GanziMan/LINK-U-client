import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AccountInfoType } from "@/app/page";
import Image from "next/image";

export default function CommonAccordion({
  AccountInfo,
  gender,
  genderImageUrl,
  backgroundColor,
}: {
  AccountInfo: AccountInfoType[];
  backgroundColor: string;
  genderImageUrl: string;
  gender: string;
}) {
  return (
    <AccordionST backgroundColor={backgroundColor}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <GenderBox>
          <Box> {gender}</Box>
          <Image src={genderImageUrl} alt="" width={50} height={50} />
        </GenderBox>
      </AccordionSummary>
      <AccordionDetailsST borderInnerColor={backgroundColor}>
        <AccordionDetailsInner>
          {AccountInfo.map((account, index) => {
            return (
              <Box key={index}>
                <AccordionDetailsInnerSection1>
                  <strong>{account.position}</strong> {account.name}
                </AccordionDetailsInnerSection1>
                <AccordionDetailsInnerSection2 onClick={() => {}}>
                  <Box>{account.accountInfo}</Box>
                  <Box>
                    <AccountWrapper>
                      <AccountIcon />
                      복사하기
                    </AccountWrapper>
                  </Box>
                </AccordionDetailsInnerSection2>
              </Box>
            );
          })}
        </AccordionDetailsInner>
      </AccordionDetailsST>
    </AccordionST>
  );
}

const AccordionST = styled(Accordion)(({
  backgroundColor,
}: {
  backgroundColor: string;
}) => {
  return {
    width: 327,
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    background: backgroundColor,
    "&.MuiPaper-root": {
      boxShadow: "none", // box-shadow 제거
    },
    "&.MuiAccordion-root::before": {
      display: "none", // ::before 의사 요소 제거
    },
  };
});

const AccordionDetailsST = styled(AccordionDetails)(({
  borderInnerColor,
}: {
  borderInnerColor: string;
}) => {
  return {
    background: "white",
    padding: "16px",
    border: `1px solid ${borderInnerColor}`,
  };
});

const AccordionDetailsInner = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  };
});
const AccordionDetailsInnerSection1 = styled(Box)(() => {
  return {
    fontSize: "16px",
    lineHeight: "24px",
  };
});

const AccordionDetailsInnerSection2 = styled(Box)(() => {
  return {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    lineHeight: "24px",
    alignItems: "center",
  };
});

const GenderBox = styled(Box)(() => {
  return {
    display: "flex",
    alignItems: "center",
  };
});
const AccountWrapper = styled(Box)(() => {
  return {
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 8px",
    alignItems: "center",
    fontSize: "11px",
    background: "#F3F3F1",
    width: 78,
    height: 28,
  };
});

const AccountIcon = styled(ContentCopyIcon)(() => {
  return {
    width: 15,
    height: 15,
  };
});
