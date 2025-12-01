function UsersPage({ users = [] }) {
  return (
    <div className="w-container mx-auto px-6 pb-12">
      <div className="bg-white shadow rounded-2xl p-8">
        <header className="mb-8 text-center">
          <p className="text-sm uppercase tracking-wide text-blue-500 font-semibold">
            Directory
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 mt-2">
            User Overview
          </h1>
          <p className="text-gray-500 mt-3">
            Browse all users assigned to dynamic form fields.
          </p>
        </header>

        {users.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {users.map((user) => (
              <li
                key={user._id}
                className="border border-slate-100 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.name || "Unnamed"}
                  </h2>
                  <span className="text-xs text-gray-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <dl className="mt-3 space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <dt className="font-medium text-gray-500">ID</dt>
                    <dd className="text-gray-700 truncate max-w-[200px]">
                      {user._id}
                    </dd>
                  </div>
                  {"age" in user && (
                    <div className="flex justify-between">
                      <dt className="font-medium text-gray-500">Age</dt>
                      <dd className="text-gray-700">{user.age ?? "-"}</dd>
                    </div>
                  )}
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">
            No users available. Create one to get started.
          </p>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
