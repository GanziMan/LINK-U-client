import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { AccountInfoType } from "@/app/main/page";

export default function CommonAccordion({
  AccountInfo,
  isMale,
  backgroundColor,
}: {
  AccountInfo: AccountInfoType[];
  backgroundColor: string;
  isMale: string;
}) {
  return (
    <AccordionST backgroundColor={backgroundColor}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {isMale}
      </AccordionSummary>
      <AccordionDetailsST>
        <AccordionDetailsInner>
          {AccountInfo.map((account, index) => {
            return (
              <Box key={index}>
                <AccordionDetailsInnerSection1>
                  <strong>{account.position}</strong> {account.name}
                </AccordionDetailsInnerSection1>
                <AccordionDetailsInnerSection2>
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

const AccordionST = styled(Accordion)(
  ({ backgroundColor }: { backgroundColor: string }) => {
    return {
      width: 327,
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      background: backgroundColor,
      "MuiButtonBase-root": {
        border: "0px",
      },
      "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiAccordion-root MuiAccordion-rounded MuiAccordion-gutters css-gc6z-MuiPaper-root-MuiAccordion-root":
        {
          boxShadow: "0px",
        },
    };
  }
);

const AccordionDetailsST = styled(AccordionDetails)(() => {
  return {
    background: "white",
    padding: "16px",
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

const DivideLine = styled(Box)(() => {
  return {
    width: "100%",
    borderBottom: "1px dotted rgb(223, 223, 223)",
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
