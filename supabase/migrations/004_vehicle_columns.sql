-- ====================================================================
-- SWARAJ TOURS & TRAVELS - VEHICLE SCHEMA ENHANCEMENTS
-- Migration: 004_vehicle_columns.sql
-- Description: Adds additional columns for Marathi localization, slug,
--              driver allowance, images and availability.
-- ====================================================================

alter table public.vehicles add column if not exists marathi_name varchar(150);
alter table public.vehicles add column if not exists slug varchar(100);
alter table public.vehicles add column if not exists driver_allowance numeric(10,2) default 300.00;
alter table public.vehicles add column if not exists min_km_per_day integer default 300;
alter table public.vehicles add column if not exists primary_image text default '/vehicles/car-1.jpeg';
alter table public.vehicles add column if not exists description_en text;
alter table public.vehicles add column if not exists description_mr text;
alter table public.vehicles add column if not exists status varchar(30) default 'available';

-- Ensure RLS allows admin CRUD on vehicles
create policy "Admins full manage on vehicles"
  on public.vehicles for all
  using (true)
  with check (true);

create policy "Admins full manage on vehicle_images"
  on public.vehicle_images for all
  using (true)
  with check (true);

