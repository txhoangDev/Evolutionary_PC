import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Box } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));

const FAQ: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    return(
        <Box>
            <Box textAlign="center" sx={{ mt: 3, mb: 3}}>
                <Typography variant="h6" component="p">
                    Find the answers to some of most asked questions
                </Typography>
            </Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>
                        Where does the name Evolutionary PC come from? 
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The algorithm that we use to figure out the best performing
                        computer is called the evolutionary algorithm. We use this algorithm
                        to configure your own personal computer. We decided to use the 
                        algorithm's name within the application's name.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>
                        How does the algorithm work?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Darwin's theory of evolution is used in this algorithm just like
                        how it is theorized in nature. We determine the components that 
                        could be good fit for your specific build. With the components 
                        that could be the best fit, we find the possible combinations
                        with a few mutations here and there in order to look at all possible
                        combinations of components. While looking at the possible combinations,
                        we look at our database to get all the performance scores of all
                        components. We sum up the performance scores to get the highest
                        performing components with the settings that you give us.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography>
                        Which brand of CPU should I choose?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        AMD vs. Intel is a long argument between computer enthusiasts that
                        eventually come down to preference. Typically, AMD CPUs are more inexpensive
                        compared to Intel. However, Intel is much better with users who are well more
                        knowledgeable in the world of computers. AMD is a good starter CPU, but Intel
                        is better for more knowledgeable users. In the end, both processors will
                        be good for performance. If you are starting your first computer build, it 
                        does not matter which brand you end up choosing.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography>
                        Which brand of GPU should I choose?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        AMD vs. GeForce is similar to the argument of which CPU brand should
                        I choose. GeForce is NVIDIA's graphics card. NVIDIA is more well known
                        in the computer gaming community. Typically, NVIDIA is much more power
                        efficient. In the end, AMD and NVIDIA both provide advanced technology
                        in their graphics card. They both will give you the best gaming experience.
                        It is merely up to preference. If you are starting a new build and are new 
                        to the computer community, it will not matter which one you choose.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography>
                        Should I get liquid cooling?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        No, liquid cooling is used for computer with heavier loads. Typically,
                        air cooling is enough for a typical use of a CPU. If you like how
                        a liquid cooler looks and have the budget for it, you should get it
                        for a better cooling system.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                <AccordionSummary
                    aria-controls="panel6a-content"
                    id="panel6a-header"
                >
                    <Typography>
                        What about compatibility?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        While the algorithm works to try and find the best possible performing
                        components for your build, it also configures all the parts that will
                        be compatible with your build. This includes making sure the motherboard
                        has the right CPU socket along with the power supply being able to provide
                        enough power to your computer.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default FAQ;