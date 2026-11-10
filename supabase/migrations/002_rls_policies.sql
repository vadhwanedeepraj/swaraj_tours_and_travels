-- ====================================================================
-- SWARAJ TOURS & TRAVELS - ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 002_rls_policies.sql
-- ====================================================================

-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.partners enable row level security;
alter table public.vehicles enable row level security;
alter table public.vehicle_images enable row level security;
alter table public.services enable row level security;
alter table public.destinations enable row level security;
alter table public.packages enable row level security;
alter table public.package_itinerary enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_vehicles enable row level security;
alter table public.payments enable row level security;
alter table public.trips enable row level security;
alter table public.trip_media enable row level security;
alter table public.reviews enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.admin_activity_logs enable row level security;

-- Helper function to check if current authenticated user is an admin or staff
create or replace function public.is_admin_or_staff()
returns boolean as $$
begin
  return exists (
    select 1 from public.users
    where supabase_auth_id = auth.uid()
    and role in ('admin', 'manager', 'staff')
    and is_active = true
  );
end;
$$ language plpgsql security definer;

-- 1. PUBLIC READ POLICIES (Website Visitors)
create policy "Public can view active vehicles"
  on public.vehicles for select
  using (is_active = true);

create policy "Public can view vehicle images"
  on public.vehicle_images for select
  using (true);

create policy "Public can view active services"
  on public.services for select
  using (is_active = true);

create policy "Public can view destinations"
  on public.destinations for select
  using (true);

create policy "Public can view packages"
  on public.packages for select
  using (true);

create policy "Public can view package itineraries"
  on public.package_itinerary for select
  using (true);

create policy "Public can view approved reviews"
  on public.reviews for select
  using (is_approved = true);

create policy "Public can view public trip media"
  on public.trip_media for select
  using (is_public = true);

-- 2. PUBLIC WRITE POLICY (Customer Booking Submission)
create policy "Public can submit booking enquiries"
  on public.bookings for insert
  with check (true);

create policy "Public can submit review"
  on public.reviews for insert
  with check (is_approved = false);

-- 3. ADMIN FULL ACCESS POLICIES
create policy "Admins full access on users"
  on public.users for all
  using (public.is_admin_or_staff());

create policy "Admins full access on customers"
  on public.customers for all
  using (public.is_admin_or_staff());

create policy "Admins full access on partners"
  on public.partners for all
  using (public.is_admin_or_staff());

create policy "Admins full access on vehicles"
  on public.vehicles for all
  using (public.is_admin_or_staff());

create policy "Admins full access on vehicle_images"
  on public.vehicle_images for all
  using (public.is_admin_or_staff());

create policy "Admins full access on services"
  on public.services for all
  using (public.is_admin_or_staff());

create policy "Admins full access on destinations"
  on public.destinations for all
  using (public.is_admin_or_staff());

create policy "Admins full access on packages"
  on public.packages for all
  using (public.is_admin_or_staff());

create policy "Admins full access on package_itinerary"
  on public.package_itinerary for all
  using (public.is_admin_or_staff());

create policy "Admins full access on bookings"
  on public.bookings for all
  using (public.is_admin_or_staff());

create policy "Admins full access on booking_vehicles"
  on public.booking_vehicles for all
  using (public.is_admin_or_staff());

create policy "Admins full access on payments"
  on public.payments for all
  using (public.is_admin_or_staff());

create policy "Admins full access on trips"
  on public.trips for all
  using (public.is_admin_or_staff());

create policy "Admins full access on trip_media"
  on public.trip_media for all
  using (public.is_admin_or_staff());

create policy "Admins full access on reviews"
  on public.reviews for all
  using (public.is_admin_or_staff());

create policy "Admins full access on booking_status_history"
  on public.booking_status_history for all
  using (public.is_admin_or_staff());

create policy "Admins full access on admin_activity_logs"
  on public.admin_activity_logs for all
  using (public.is_admin_or_staff());

