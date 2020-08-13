import DateOption from '../client/components/DateOption.jsx';
import CalendarBox from '../client/components/CalendarBox.jsx';

describe('<DateOption />', () => {
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