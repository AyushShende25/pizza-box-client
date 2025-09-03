import { ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router";
import { useLogout, useMe } from "@/api/authApi";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

function Navbar() {
	const logout = useLogout();
	const { data: user, isPending } = useMe();

	return (
		<nav className="border-b sticky top-0 z-50  backdrop-blur">
			<div className="flex items-center justify-between px-4 py-4 md:px-10">
				<NavLink to="/">
					<Logo />
				</NavLink>

				{/* Right side */}
				<div className="flex items-center gap-4 md:gap-6">
					<NavLink to="/cart">
						<div className="relative">
							<ShoppingCart />
							<span className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
								{2}
							</span>
						</div>
					</NavLink>
					{isPending ? (
						<Skeleton className="size-12 rounded-full" />
					) : user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<User />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<NavLink to="/address">Manage Addresses</NavLink>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<NavLink to="/orders">My Orders</NavLink>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => logout.mutate()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button asChild variant="outline" className="text-primary">
							<NavLink to="/login">Login</NavLink>
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
