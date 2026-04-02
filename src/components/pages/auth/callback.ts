import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect, url }) => {
  // This page is only used to let Supabase set the session cookie.
  // After OAuth, the user is redirected here, and the Supabase client
  // will automatically exchange the code for a session.
  // We simply redirect back to the guestbook page.
  const returnUrl = url.searchParams.get('returnTo') || '/guestbook';
  return redirect(returnUrl);
};