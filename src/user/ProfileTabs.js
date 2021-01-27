import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FollowGrid from './../user/FollowGrid';
import FileList from './../file/FileList';

export default function ProfileTabs(props) {
	const [tab, setTab] = useState(0);

	const handleTabChange = (event, value) => {
		setTab(value);
	};

	return (
		<div>
			<AppBar position='static' color='default'>
				<Tabs
					value={tab}
					onChange={handleTabChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'>
					<Tab label='Files' />
				</Tabs>
			</AppBar>
			{tab === 0 && (
				<TabContainer>
					<FileList removeUpdate={props.removeFileUpdate} posts={props.files} />
				</TabContainer>
			)}
		</div>
	);
}

ProfileTabs.propTypes = {
	user: PropTypes.object.isRequired,
	removeFileUpdate: PropTypes.func.isRequired,
	files: PropTypes.array.isRequired,
};

const TabContainer = (props) => {
	return (
		<Typography component='div' style={{ padding: 8 * 2 }}>
			{props.children}
		</Typography>
	);
};

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};
