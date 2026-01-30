import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { loginUser, registerUser, clearErrors } from "@/features/authSlice";
import type { AppDispatch, RootState } from "@/features/store";
import Logo from "/Clippathgroup.svg";
import pic from "@/assets/image8.svg";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Mengambil state dari navigasi (Sign In / Sign Up)
  const initialMode = location.state?.mode || "login";

  const { isLoading, errors: serverErrors } = useSelector(
    (state: RootState) => state.auth,
  );

  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Sinkronisasi jika user klik tombol di Navbar saat sudah berada di halaman Auth
  useEffect(() => {
    setIsLogin(initialMode === "login");
    dispatch(clearErrors());
    setLocalErrors({});
  }, [initialMode, dispatch]);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalErrors({});
    dispatch(clearErrors());

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Validasi Client-side
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Error Text Helper";
    if (!password) newErrors.password = "Error Text Helper";

    if (!isLogin) {
      if (!formData.get("name")) newErrors.name = "Error Text Helper";
      if (!formData.get("phone")) newErrors.phone = "Error Text Helper";
      const confirm = formData.get("confirm") as string;
      if (password !== confirm) newErrors.confirm = "Error Text Helper";
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    // 2. Eksekusi API via Redux Thunk
    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email, password })).unwrap();

        if (result.token || result.data?.token) {
          navigate("/");
        }
      } else {
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        await dispatch(registerUser({ name, email, phone, password })).unwrap();

        setIsLogin(true);
        alert("Account created successfully! Please sign in.");
      }
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  return (
    <div className="flex relative max-w-360 w-full ">
      <div className="absolute overflow-hidden right-[50%] h-256">
        <img
          src={pic}
          alt="Hamburger"
          className="h-256 hidden md:block object-cover"
        />
      </div>
      <div className="absolute md:left-[50%] w-full md:w-[50%] flex items-center top-35.5 md:top-37.75 justify-center">
        <div className="flex flex-col w-86.25 gap-4 md:w-93.5 md:gap-5 ">
          {/* Logo & Header */}
          <div className="flex gap-2.75 items-center md:gap-3.75">
            <img
              src={Logo}
              alt="Logo-Foody"
              className="w-8 h-8 md:w-10.5 md:h-10.5 "
            />
            <span className="font-extrabold text-[28px]/[38px] md:text-[32px]/[42px]">
              Foody
            </span>
          </div>
          <div className="flex flex-col justify-start">
            <h1 className="text-[24px]/[36px] md:text-[28px]/[38px] font-extrabold">
              Welcome Back
            </h1>
            <p className="text-[14px]/[28px] md:text-[16px]/[30px] font-medium">
              Good to see you again! Let's eat
            </p>
          </div>
          {/* Switcher Tab */}
          <div className="flex bg-neutral-100 gap-2 p-2 rounded-2xl items-center w-full h-12 md:h-14">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                dispatch(clearErrors());
              }}
              className={cn(
                "flex h-9 md:h-10 items-center justify-center w-full text-[14px]/[28px] md:text-[16px]/[30px] font-bold transition-all duration-700 ease-in-out hover:scale-105 hover:bg-neutral-50",
                isLogin
                  ? "bg-white shadow-sm rounded-lg"
                  : "text-neutral-600 h-10 hover:text-gray-600",
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                dispatch(clearErrors());
              }}
              className={cn(
                "flex h-9 md:h-10 items-center justify-center w-full text-[14px]/[28px] md:text-[16px]/[30px] font-bold transition-all duration-700 ease-in-out hover:scale-105 hover:bg-neutral-50",
                !isLogin
                  ? "bg-white shadow-sm rounded-lg "
                  : "text-neutral-600 h-10 hover:text-gray-600",
              )}
            >
              Sign Up
            </button>
          </div>

          {serverErrors && (
            <div className="mb-6 p-4  bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4 md:gap-5 animate-in fade-in zoom-in-95">
              <AlertCircle className="text-red-500 shrink-0" size={18} />
              <p className="text-red-700 text-xs font-bold uppercase tracking-wide leading-relaxed">
                {typeof serverErrors === "string"
                  ? serverErrors
                  : serverErrors.message || "Authentication Failed"}
              </p>
            </div>
          )}

          <form onSubmit={handleAuth} className="flex flex-col gap-4 md:gap-5">
            {!isLogin && (
              <>
                <div className="relative">
                  <Input
                    name="name"
                    placeholder="Name"
                    className="rounded-2xl py-2 text-[14px]/[28px] text-neutral-500 px-3 h-12 border-neutral-300 md:h-14 md:text-[16px]/[30px] "
                  />
                  {localErrors.name && (
                    <p className="text-red-600 text-[12px]/[26px] md:text-[14px]/[28px] font-semibold">
                      {localErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    className="rounded-2xl py-2 text-[14px]/[28px] text-neutral-500 px-3 h-12 border-neutral-300 md:h-14 md:text-[16px]/[30px]"
                  />
                  {localErrors.phone && (
                    <p className="text-red-600 text-[12px]/[26px] md:text-[14px]/[28px] font-semibold">
                      {localErrors.phone}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                className="rounded-2xl py-2 text-[14px]/[28px] text-neutral-500 px-3 h-12 border-neutral-300 md:h-14 md:text-[16px]/[30px]"
              />
              {localErrors.email && (
                <p className="text-red-600 text-[12px]/[26px] md:text-[14px]/[28px] font-semibold">
                  {localErrors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="rounded-2xl py-2 text-[14px]/[28px] text-neutral-500 px-3 h-12 border-neutral-300 md:h-14 md:text-[16px]/[30px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-neutral-950 w-4 h-4 hover:text-neutral-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-full h-full" />
                  ) : (
                    <Eye className="w-full h-full" />
                  )}
                </button>
              </div>
              {localErrors.password && (
                <p className="text-red-600 text-[12px]/[26px] md:text-[14px]/[28px] font-semibold">
                  {localErrors.password}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <div className="relative">
                  <Input
                    name="confirm"
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-2xl py-2 text-[14px]/[28px] text-neutral-500 px-3 h-12 border-neutral-300 md:h-14 md:text-[16px]/[30px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-neutral-950 w-4 h-4 hover:text-neutral-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-full h-full" />
                    ) : (
                      <Eye className="w-full h-full" />
                    )}
                  </button>
                </div>
                {localErrors.confirm && (
                  <p className="text-red-600 text-[12px]/[26px] md:text-[14px]/[28px] font-semibold">
                    {localErrors.confirm}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-5 h-5 border-neutral-300 accent-[#C12116]"
                />
                <label
                  htmlFor="remember"
                  className="text-[14px]/[28px] font-bold text-neutral-950 cursor-pointer"
                >
                  Remember Me
                </label>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-[#FDFDFD] font-bold text-[16px]/[30px]  bg-[#C12116] hover:bg-[#A52323] rounded-full active:scale-95 transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : isLogin ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
