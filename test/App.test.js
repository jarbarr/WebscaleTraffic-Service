import App from '../client/components/App';

// a simple test to test do Jest and Enzyme set up correctly
describe('<App /> rendering', () => {
    it('should render one <p>', () => {
        let wrapper = shallow(<App />);
        expect(wrapper.children('p')).toHaveLength(1);
    });
});