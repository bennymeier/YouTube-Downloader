import React from 'react';
import {
  Container,
  CssBaseline,
  createStyles,
  withStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import Main from './components/Main';
import Sidebar, { Downloads } from './components/Sidebar';
import SearchContainer from './components/SearchContainer';
import { getDownloadUrl, isYtUrl } from './utils/helpers';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  });

type Props = WithStyles<typeof styles>;
type Format = 'mp4' | 'mp3' | 'mov' | 'flv';
interface State {
  downloads: Downloads[];
  searchString: string;
  downloadURL: string;
  currentVideo: any;
  format: Format;
}
class App extends React.Component<Props, State> {
  private hiddenDownloadBtn = React.createRef<HTMLAnchorElement>();
  state: State = {
    downloads: [],
    searchString: '',
    downloadURL: '',
    currentVideo: null,
    format: 'mp4',
  };

  search = (searchString: string, format: Format) => {
    const isYTUrl = isYtUrl(searchString);
    this.setState({ searchString, format }, () => {
      if (isYTUrl) {
        console.log('DOWNLOAD');
        this.downloadVideo();
      } else {
        console.log('FETCH SUGGESTIONS');
        this.fetchSuggestions();
      }
    });
  };

  fetchSuggestions = () => {};

  getInfos = () => {

  };

  downloadVideo = () => {
    const { searchString, format } = this.state;
    const downloadURL = getDownloadUrl(searchString, format);
    this.setState({ downloadURL }, () => {
      this.hiddenDownloadBtn.current.click();
    });
  };

  clickHiddenDownloadBtn = () => {};

  render() {
    const { classes } = this.props;
    const { downloads, downloadURL } = this.state;

    return (
      <>
        <div className={classes.root}>
          <CssBaseline />
          <Sidebar downloads={downloads} />
          <Main>
            <Container maxWidth="lg" className={classes.container}>
              <SearchContainer handleSearch={this.search} />
            </Container>
          </Main>
        </div>
        <a
          href={downloadURL}
          download
          className="hidden"
          ref={this.hiddenDownloadBtn}
        >
          {downloadURL}
        </a>
      </>
    );
  }
}

export default withStyles(styles)(App);
