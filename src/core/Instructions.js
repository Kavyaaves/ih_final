import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		minHeight: 350,
		textAlign: 'center',
	},
	paper: {
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		margin: 'auto',
		padding: '1rem',
	},
	row: {
		padding: 10,
	},
	cell: {
		padding: 10,
	},

	div: {
		width: 500,
		height: 400,
		overflow: 'auto',
		margin: 'auto',
		border: '2px solid black',
	},

	content: {
		lineHeight: '1.6em',
		fontSize: 11,
	},
}));

// const docRef = db.collection('posts');
// console.log(docRef);

// docRef.onSnapshot((snapshot) => {
// 	const postData = [];
// 	snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
// 	setFilesList(postData);
// });

const Archives = (props) => {
	const classes = useStyles();

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				marginTop: 0,
				minHeight: 350,
			}}>
			<div>
				<Paper className={classes.root} elevation={4}>
					<Typography variant='h6' className={classes.title}>
						Guidelines to Authors
					</Typography>
					<div
						style={{
							width: 550,
							margin: 'auto',
							textAlign: 'left',
							// fontFamily: 'Roboto, Helvetica',
						}}>
						<Typography variant='body2' className={classes.content}>
							<ul>
								<li>
									Indian Hydrobiology accepts original research papers and
									review articles on all aspects of the biology of aquatic
									organisms in relation to their environment and exploitation of
									these for the benefit of human welfare.
								</li>
								<li>
									Papers are published on the understanding that the authors
									have to pay a page charge to be notified to the authors at the
									time of the approval of final proof.
								</li>
								<li>
									3) Manuscripts should be submitted as soft copy typed using
									Microsoft word, with font no. 12, Times New Roman script, in
									double line space. Figures and illustrations have to be made
									in to separate JPEG plates accompanied with legend separately
									in ms word file. First page of the manuscript should contain
									the title of the paper, a running title name(s) of authors.
								</li>
								<li>
									The author(s) with address, email id of author for
									communication and an abstract not exceeding 200 words to be
									given in second page.
								</li>
								<li>
									Original research papers should be divided into Introduction,
									Material and Methods, Results, Discussion, conclusion,
									Acknowledgements (if any) and References.
								</li>
								<li>
									Tables with proper numbers and formatted properly to be
									included at the end of the Text in the manuscript.
								</li>
								<li>
									Figures should be grouped together in such a way as to drawn
									on the plate with clear figure numbers in good contrast to the
									back ground. Colour plates are accepted for publication on
									payment of extra charges.
								</li>
								<li>Do not mix photographs and ink drawings on one plate.</li>
								<li>
									Indicate clearly the position where tables, plates and figures
									to be inserted.
								</li>{' '}
								<li>
									References in the text should be by name of author(s) and year
									of publication, title of paper, abbreviated name of journal,
									volume, number and inclusive pages should be listed under
									references in an alphabetical order. Books should be cited by
									title, name of publisher and/or plates of publication and
									total number of pages.
								</li>
								<li>
									Papers intended for publication in IH should be mailed to the
									Chief Editor, Indian Hydrobiology.
								</li>
								<li>
									Only pdf of published paper will be sent to concerned authors
									after the release of hard copies of the journal. Reprints are
									not supplied. Hard copy of the journal is supplied only to
									members of KIA.
								</li>
							</ul>
							<br />
							<span style={{ color: 'red' }}>Sample Citations: </span>
							<br />
							<div
								style={{
									width: 500,
									margin: 'auto',
									lineHeight: '1.6em',
									fontSize: 11,
								}}>
								Papers and reports submitted in periodicals
								<br />
								1) Bryan, G.W. 1960. The absorption of zinc and other metals by
								the brown seaweed, Laminaria digitata. J. mar. biol. Ass. U.K.,
								49: 225-243.
								<br /> Papers in edited books:
								<br />
								2) Burns, N.M. and Ross, C. 1972. Oxygen-nutrient relationships
								within the central basin of Lake Erie. In: H.E.Allen and J.R.
								Karmer (eds.). Nutrients in natural water, Wiley-Interscience
								pp. 193-250.
								<br /> Books:
								<br /> 3) Round, F.E. 1979. The Ecology of Algae. Cambridge
								Univ. Press, U.K. 652 pp.
								<br />
								<br />
								<span style={{ color: 'red' }}>
									Original research articles on all aspects of algae and other
									aquatic organisms are invited to be included in the
									forthcoming issue to be released in December, 2020. Send your
									article before 30th June, 2020 with a self certificate that
									your article has not beensent to any other journal for
									publication.
								</span>
							</div>
						</Typography>
					</div>
					<br />
				</Paper>
			</div>
			<br />
		</div>
	);
};

export default Archives;
