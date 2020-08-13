import App from '../client/components/App';

describe('<App />', () => {
    it('should invoke componentDidMount', () => {
      const spy = jest.spyOn(App.prototype, 'componentDidMount');
      const wrapper = mount(<App />);
      expect(App.prototype.componentDidMount).toHaveBeenCalledTimes(1);
  });
});