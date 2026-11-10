-- ====================================================================
-- SWARAJ TOURS & TRAVELS (स्वराज टुर्स अँड ट्रॅव्हल्स) - DATABASE SCHEMA
-- Migration: 001_initial_schema.sql
-- Description: Creates 17 core relational tables with UUIDs, constraints, and indexes
-- ====================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS & OPERATIONAL ROLES
create table if not exists public.users (
    id uuid primary key default uuid_generate_v4(),
    supabase_auth_id uuid unique references auth.users(id) on delete cascade,
    full_name varchar(150) not null,
    email varchar(255) not null unique,
    phone varchar(20),
    role varchar(50) not null default 'staff' check (role in ('admin', 'manager', 'staff', 'driver')),
    is_active boolean not null default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. CUSTOMERS MASTER TABLE
create table if not exists public.customers (
    id uuid primary key default uuid_generate_v4(),
    full_name varchar(150) not null,
    mobile_number varchar(20) not null,
    alternate_number varchar(20),
    email varchar(255),
    city varchar(100) default 'Nanded',
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_customers_mobile on public.customers(mobile_number);

-- 3. PARTNERS (Partner vehicle owners)
create table if not exists public.partners (
    id uuid primary key default uuid_generate_v4(),
    partner_name varchar(150) not null,
    phone varchar(20) not null,
    alternate_phone varchar(20),
    address text,
    commission_rate numeric(5,2) default 10.00,
    status varchar(30) default 'active' check (status in ('active', 'inactive', 'suspended')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. VEHICLES (Owned & Partner Fleet)
create table if not exists public.vehicles (
    id uuid primary key default uuid_generate_v4(),
    name varchar(100) not null,
    marathi_name varchar(150),
    slug varchar(100),
    registration_number varchar(50) unique,
    model_year varchar(10),
    category varchar(50) not null check (category in ('Sedan', 'SUV/MUV', 'Tempo Traveller', 'Luxury Coach', 'Hatchback')),
    seating_capacity integer not null default 4,
    ac_available boolean not null default true,
    luggage_capacity varchar(100) default '2-3 Large Bags',
    ownership_type varchar(30) not null default 'owned' check (ownership_type in ('owned', 'partner')),
    partner_id uuid references public.partners(id) on delete set null,
    base_price_per_km numeric(10,2) default 12.00,
    driver_allowance numeric(10,2) default 300.00,
    min_km_per_day integer default 300,
    primary_image text default '/vehicles/car-1.jpeg',
    description_en text,
    description_mr text,
    status varchar(30) default 'available' check (status in ('available', 'on_request', 'on_trip', 'maintenance')),
    is_active boolean not null default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. VEHICLE IMAGES
create table if not exists public.vehicle_images (
    id uuid primary key default uuid_generate_v4(),
    vehicle_id uuid not null references public.vehicles(id) on delete cascade,
    image_url text not null,
    is_primary boolean not null default false,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_vehicle_images_vehicle on public.vehicle_images(vehicle_id);

-- 6. SERVICES (10 Core Services)
create table if not exists public.services (
    id uuid primary key default uuid_generate_v4(),
    slug varchar(100) not null unique,
    title_en varchar(150) not null,
    title_mr varchar(150) not null,
    description_en text,
    description_mr text,
    icon_name varchar(50),
    is_active boolean not null default true,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. DESTINATIONS
create table if not exists public.destinations (
    id uuid primary key default uuid_generate_v4(),
    slug varchar(100) not null unique,
    name_en varchar(150) not null,
    name_mr varchar(150) not null,
    category_en varchar(100),
    category_mr varchar(100),
    distance_km integer not null default 0,
    description_en text,
    description_mr text,
    thumbnail_url text,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. TOUR PACKAGES
create table if not exists public.packages (
    id uuid primary key default uuid_generate_v4(),
    destination_id uuid references public.destinations(id) on delete set null,
    title_en varchar(200) not null,
    title_mr varchar(200) not null,
    duration_days integer not null default 1,
    duration_nights integer not null default 0,
    starting_price numeric(10,2) default 0.00,
    description_en text,
    description_mr text,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. PACKAGE ITINERARY
create table if not exists public.package_itinerary (
    id uuid primary key default uuid_generate_v4(),
    package_id uuid not null references public.packages(id) on delete cascade,
    day_number integer not null default 1,
    title_en varchar(200) not null,
    title_mr varchar(200) not null,
    description_en text,
    description_mr text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. BOOKINGS (Central Enquiries & Bookings)
create table if not exists public.bookings (
    id uuid primary key default uuid_generate_v4(),
    booking_number varchar(50) not null unique,
    customer_id uuid references public.customers(id) on delete set null,
    customer_name varchar(150) not null,
    customer_mobile varchar(20) not null,
    service_id uuid references public.services(id) on delete set null,
    package_id uuid references public.packages(id) on delete set null,
    pickup_location text not null,
    drop_location text not null,
    travel_date date not null,
    pickup_time time,
    return_date date,
    passenger_count varchar(20) not null default '1–4',
    vehicle_preference varchar(100),
    quoted_amount numeric(10,2),
    final_amount numeric(10,2),
    status varchar(40) not null default 'enquiry_received' check (
        status in ('enquiry_received', 'quotation_sent', 'confirmed', 'in_progress', 'completed', 'cancelled')
    ),
    additional_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index if not exists idx_bookings_date on public.bookings(travel_date);
create index if not exists idx_bookings_status on public.bookings(status);

-- 11. BOOKING VEHICLES (Assigned vehicle and driver)
create table if not exists public.booking_vehicles (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid not null references public.bookings(id) on delete cascade,
    vehicle_id uuid references public.vehicles(id) on delete set null,
    driver_name varchar(150),
    driver_phone varchar(20),
    assigned_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. PAYMENTS
create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid not null references public.bookings(id) on delete cascade,
    amount numeric(10,2) not null,
    payment_type varchar(30) default 'advance' check (payment_type in ('advance', 'part_payment', 'final_settlement', 'refund')),
    payment_mode varchar(30) default 'cash' check (payment_mode in ('cash', 'upi', 'bank_transfer', 'cheque')),
    transaction_ref varchar(100),
    status varchar(30) default 'completed' check (status in ('pending', 'completed', 'failed', 'refunded')),
    paid_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. TRIPS
create table if not exists public.trips (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid not null unique references public.bookings(id) on delete cascade,
    start_odometer_km numeric(10,1),
    end_odometer_km numeric(10,1),
    toll_charges numeric(10,2) default 0.00,
    parking_charges numeric(10,2) default 0.00,
    trip_summary text,
    started_at timestamp with time zone,
    ended_at timestamp with time zone
);

-- 14. TRIP MEDIA (Gallery)
create table if not exists public.trip_media (
    id uuid primary key default uuid_generate_v4(),
    trip_id uuid references public.trips(id) on delete cascade,
    media_url text not null,
    caption text,
    is_public boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. REVIEWS & TESTIMONIALS
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    customer_id uuid references public.customers(id) on delete set null,
    trip_id uuid references public.trips(id) on delete set null,
    customer_name varchar(150) not null,
    city varchar(100) default 'Nanded',
    rating integer not null check (rating >= 1 and rating <= 5),
    comment_en text,
    comment_mr text,
    is_approved boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 16. BOOKING STATUS HISTORY (Audit Trail)
create table if not exists public.booking_status_history (
    id uuid primary key default uuid_generate_v4(),
    booking_id uuid not null references public.bookings(id) on delete cascade,
    old_status varchar(40),
    new_status varchar(40) not null,
    changed_by uuid references public.users(id) on delete set null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. ADMIN ACTIVITY LOGS (Security and Compliance)
create table if not exists public.admin_activity_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete set null,
    action varchar(100) not null,
    entity_type varchar(50) not null,
    entity_id uuid,
    details jsonb,
    ip_address varchar(50),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

