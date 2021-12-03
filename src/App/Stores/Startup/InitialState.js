import adminRoutes from "../../Navigators/NavRoutes/AdminRoutes";
import publicRoutes from "../../Navigators/NavRoutes/PublicRoutes";
import merchantRoutes from "../../Navigators/NavRoutes/MerchantRoutes";

/**
 * The initial values for the redux state.
 */
export const INITIAL_STATE = {
  data: [],
  user: {},
  role: "",
  permissions: {},
  error: "",
  isAuthenticated: false,
  notificationCount: 0,
  roleSummary: null,
  userRoutes: [...adminRoutes, ...merchantRoutes, ...publicRoutes],
  userRoleSummary: {
    page: 0,
    size: 0,
    totalItems: 0,
    totalPages: 0,
    users: [],
  },
  ALlpermissions: null,
  newNotifications: null,
  roleUpdata: null,
  language: "en",
  categories: null,
  brands: null,
  OTPVerification: {},
  OTPGeneration: {},
  merchantSignUpResp: {},
  success: null,
};
