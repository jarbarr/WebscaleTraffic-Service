import DateOption from '../client/components/DateOption.jsx';
import CalendarBox from '../client/components/CalendarBox.jsx';

describe('<DateOption />', () => {
    it('should set clicked to true when handleClick() is invoked', () => {
        let wrapper = mount(<DateOption />);
        wrapper.setState({clicked: false});
        wrapper.instance().handleClick();
        expect(wrapper.state('clicked')).toBe(true);
    });
    it('should set clicked to false when close() is invoked', () => {
        let wrapper = mount(<DateOption />);
        wrapper.setState({clicked: true});
        wrapper.instance().close();
        expect(wrapper.state('clicked')).toBe(false);
    });
    it('should render <CalendarBox /> when clicked is true', () => {
        let wrapper = mount(<DateOption />);
        wrapper.setState({clicked: true});
        expect(wrapper.find(CalendarBox).exists()).toEqual(true);
    });
    it('should not render <CalendarBox /> when clicked is false', () => {
        let wrapper = mount(<DateOption />);
        wrapper.setState({clicked: false});
        expect(wrapper.find(CalendarBox).exists()).toEqual(false);
    });
});