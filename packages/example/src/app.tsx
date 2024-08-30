import ReactSwUpdater from '@jswork/react-sw-updater/src/main';
import '@jswork/react-sw-updater/src/style.scss';

function App() {
  return (
    <div className="m-10 p-4 shadow bg-gray-100 text-gray-800 hover:shadow-md transition-all">
      <div className="badge badge-warning absolute right-0 top-0 m-4">
        Build Time: {BUILD_TIME}
      </div>
      <ReactSwUpdater
        onChange={({ execute }) => {
          const confirmed = confirm('New version available, do you want to update?');
          execute(confirmed);
        }}
      />
    </div>
  );
}

export default App;
