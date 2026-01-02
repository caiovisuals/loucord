type User = {
  id: string
  name: string
  image: string
}

function Sidebar({ users }: { users: User[] }) {
  return (
    <aside className="h-full w-[18%] flex flex-col gap-2 p-3 z-50">
      <div className="p-2">
        <h2 className="text-lg">Mensagens</h2>
      </div>
      <div className="flex flex-col gap-2">
        {users.map(user => (
          <div key={user.id} className="flex flex-row items-center gap-3 cursor-pointer bg-[var(--foreground)] hover:bg-[var(--primaryground)] p-2 rounded-xl lou-transition">
            <img src={user.image} alt={user.name} width={512} height={512} className="rounded-full aspect-square size-8"/>
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
