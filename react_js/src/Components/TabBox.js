import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, styled } from '@mui/material';
import DayBox from "./DayBox"
import MonthBox from "./MonthBox"

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box style={{ p: 0, height: '100%' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function tabProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
	({ theme }) => ({
		textTransform: 'none',
		color: 'white',
		minHeight: '5rem',
		fontFamily: 'Poppins',
		backgroundColor: 'transparent',
		padding: '12px 30px',
		'&.Mui-selected': {
			color: '#fff',
			borderTopLeftRadius: '35px',
			borderTopRightRadius: '35px',
			background: 'linear-gradient(135deg, #5476e7 0%, #5578e8 100%)',
			borderTop: '50px',
			zIndex: 2
		},
		'&:not(.Mui-selected)': {
			color: '#01175F',
			backgroundColor: 'white',
			borderTopLeftRadius: '35px',
			borderTopRightRadius: '35px',
			boxShadow: '5px 10px 20px 0 rgba(0,0,0,0.17)',
			zIndex: 1
		},
		'&.Mui-focusVisible': {
			backgroundColor: 'red',
		},

	})
);

export default function TabBox() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box className='w-full h-full flex flex-col' >
			<Tabs className="bg-transparent h-20" value={value} onChange={handleChange} indicatorColor={"primary"}>
				<StyledTab label="This Week" className={`!text-2xl !font-semibold ${value == 0 ? "" : "!pr-[100px]"}`} {...tabProps(0)} />
				<StyledTab label="This Month" className={`!text-2xl !font-semibold ${value == 1 ? "left-[-80px]" : "!pl-[80px] left-[-60px]"}`} {...tabProps(1)} />
			</Tabs>
			<Box className="h-full rounded-b-[35px] rounded-tr-[35px]" sx={{ backgroundColor: 'white', height: 'calc(100% - 76px)' }}>
				<TabPanel className={`p-0 h-full grow rounded-b-[35px] rounded-tr-[35px] ${value ? "rounded-[35px]" : ""}`} value={value} index={0} style={{ background: 'linear-gradient(170deg, #5374E7 0%, #77B9F5 100%)' }}>
					<DayBox/>
				</TabPanel>
				<TabPanel className={`h-full grow rounded-[35px] ${value ? "rounded-[35px]" : ""}`} value={value} index={1} style={{ background: 'linear-gradient(170deg, #5374E7 0%, #77B9F5 100%)' }}>
					<MonthBox/>
				</TabPanel>
			</Box>
		</Box>
	);
}
