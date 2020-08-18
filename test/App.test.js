import App from '../client/components/App';

describe('<App />', () => {
  it('should invoke componentDidMount', () => {
    const spy = jest.spyOn(App.prototype, 'componentDidMount');
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });
  // it('should set nightly_fee to a number larger than 0 when getRoomData(roomID) is invoked', () => {
  //   let wrapper = mount(<App />);
  //   expect(wrapper.state('nightly_fee') === 0).toBe(true);
  //   wrapper.instance().getRoomData(1);
  //   expect(wrapper.state('nightly_fee') > 0).toBe(true);
  // });
});