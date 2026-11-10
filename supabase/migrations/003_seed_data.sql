-- ====================================================================
-- SWARAJ TOURS & TRAVELS - SEED DATA
-- Migration: 003_seed_data.sql
-- ====================================================================

-- 1. SEED 10 CORE SERVICES
insert into public.services (slug, title_en, title_mr, description_en, description_mr, icon_name, display_order)
values
('local-car-rental', 'Local Car Rental', 'स्थानिक कार भाडे', 'Hourly and daily car rentals within Nanded city.', 'नांदेड शहरांतर्गत तासानुसार व दैनिक कार सेवा.', 'MapPin', 1),
('outstation-trips', 'Outstation Trips', 'आउटस्टेशन प्रवास', 'Intercity taxi services across Maharashtra and India.', 'महाराष्ट्र व संपूर्ण भारतात लांब पल्ल्याचा प्रवास.', 'Compass', 2),
('one-way-round-trip', 'One-Way & Round Trips', 'वन-वे आणि राउंड ट्रिप', 'Flexible single-drop or return trip options.', 'किफायतशीर वन-वे ड्रॉप किंवा राउंड ट्रिप सुविधा.', 'Repeat', 3),
('airport-railway-transfers', 'Airport & Railway Transfers', 'विमानतळ व रेल्वे ट्रान्सफर', 'Punctual pickup and drop to airports & stations.', 'वेळेवर विमानतळ व रेल्वे स्थानक ट्रान्सफर.', 'Plane', 4),
('wedding-transportation', 'Wedding Transportation', 'लग्नकार्यासाठी गाड्या', 'Decorated cars and fleet for wedding celebrations.', 'लग्न सोहळे व वरातीसाठी सजवलेल्या लक्झरी गाड्या.', 'HeartHandshake', 5),
('family-trips', 'Family Trips', 'कौटुंबिक सहली', 'Comfortable AC cars for family vacations.', 'कुटुंबासह सुरक्षित व आरामदायी सुट्टीचा प्रवास.', 'Users', 6),
('picnic-packages', 'Picnic Packages', 'पिकनिक पॅकेजेस', 'Short day tours and scenic picnic trips.', 'धबधबे, धरणे व निसर्गरम्य पर्यटन स्थळांसाठी सहली.', 'Palmtree', 7),
('tourism-sightseeing', 'Tourism & Sightseeing', 'पर्यटन व दर्शन यात्रा', 'Pilgrimage and historical sightseeing tours.', 'तीर्थक्षेत्र दर्शन व ऐतिहासिक स्थळ दर्शन.', 'Camera', 8),
('corporate-travel', 'Corporate Travel', 'कॉर्पोरेट प्रवास', 'Executive transportation for business meetings.', 'कंपन्या व व्यावसायिक भेटींसाठी दर्जेदार सेवा.', 'Briefcase', 9),
('custom-packages', 'Customized Travel Packages', 'कस्टम टूर पॅकेजेस', 'Customized itineraries tailored to your needs.', 'तुमच्या वेळेनुसार व आवडीनुसार बनवलेली सहल.', 'Sparkles', 10)
on conflict (slug) do nothing;

-- 2. SEED POPULAR DESTINATIONS FROM NANDED
insert into public.destinations (slug, name_en, name_mr, category_en, category_mr, distance_km, description_en, description_mr, is_featured)
values
('shirdi', 'Shirdi', 'शिर्डी', 'Pilgrimage', 'तीर्थक्षेत्र', 340, 'Shirdi Sai Baba Temple Darshan.', 'साई समाधी मंदिर दर्शन व परतीचा प्रवास.', true),
('tuljapur', 'Tuljapur', 'तुळजापूर', 'Shaktipeeth', 'शक्तिपीठ', 260, 'Bhavani Mata Temple Darshan.', 'आई तुळजाभवानी दर्शन यात्रा.', true),
('sambhajinagar', 'Chhatrapati Sambhajinagar', 'छत्रपती संभाजीनगर', 'Heritage', 'ऐतिहासिक', 235, 'Ajanta, Ellora and city historical tour.', 'वेरूळ, अजिंठा लेणी व शहर दर्शन.', true),
('hyderabad', 'Hyderabad', 'हैदराबाद', 'Outstation', 'आंतरराज्य', 280, 'Airport drops and sightseeing.', 'रामोजी फिल्म सिटी व विमानतळ ट्रान्सफर.', true),
('mahur', 'Mahurgad', 'माहूर', 'Shaktipeeth', 'शक्तिपीठ', 125, 'Shri Renuka Mata Shaktipeeth.', 'श्री रेणुका माता दर्शन यात्रा.', true),
('parli-aundha', 'Parli & Aundha', 'परळी व औंढा', 'Jyotirlinga', 'ज्योतिर्लिंग', 110, 'Two Jyotirlingas in one circuit.', 'दोन पवित्र ज्योतिर्लिंग दर्शन यात्रा.', true)
on conflict (slug) do nothing;

-- 3. SEED VEHICLES
insert into public.vehicles (name, registration_number, category, seating_capacity, ac_available, luggage_capacity, ownership_type, base_price_per_km, is_active)
values
('Maruti Suzuki Swift Dzire', 'MH-26-BE-1001', 'Sedan', 4, true, '2 Large Bags', 'owned', 12.00, true),
('Maruti Suzuki Ertiga', 'MH-26-BE-1002', 'SUV/MUV', 6, true, '3 Large Bags + Carrier', 'owned', 15.00, true),
('Toyota Innova Crysta', 'MH-26-BE-1003', 'Luxury Coach', 7, true, '4 Large Bags', 'partner', 20.00, true)
on conflict (registration_number) do nothing;

