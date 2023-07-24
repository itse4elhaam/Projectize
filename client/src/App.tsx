
import {Routes, Route} from "react-router-dom"
import Test from "./components/test";

function App() {

  return (
		<>
			<Routes>
				<Route path="/routes" element={<Test />} >First Route</Route>
			</Routes>
		</>
  );
}
 
export default App
