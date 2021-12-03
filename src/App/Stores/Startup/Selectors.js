/**
 *
 * State Selectors
 */

export const getInvoice = (state) => state.invoice.data;

export const getInvoiceState = (state) => state.invoice;

export const getRole = (state) => state.startup.role
export const userId = state => state.user.userId