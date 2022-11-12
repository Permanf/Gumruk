import LayoutProfile from "../../../../components/Profile/Layout";
import Step from "../../../../components/Profile/Stepper";

const Information = () => {
  // const { lang, token } = useSelector((state) => state.auth);
  // const [country_data, setCountry_data] = useState([]);
  // const data = null;
  // useEffect(() => {
  //   if (token) {
  //     dispatch(
  //       fetchData({
  //         token,
  //         url: `user/declaration/create`,
  //         action: (response) => {
  //           if (response.success) {
  //             console.log(response.data.data.countries);
  //             // setCountry_data(response?.data?.data?.countries);
  //             // data = response?.data?.data?.countries?.map(
  //             //   (item, index) => `Item ${item?.name?.tm}`
  //             // );
  //           } else {
  //             console.log(response.message);
  //           }
  //         },
  //       })
  //     );
  //   } // eslint-disable-next-line
  // }, []);

  return (
    <LayoutProfile title="Declarasiya doretmek">
      <h1 className="p-4 font-semibold text-xl mb-5">Declaration create</h1>
      <Step />
    </LayoutProfile>
  );
};

export default Information;
