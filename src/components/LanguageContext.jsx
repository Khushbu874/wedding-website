import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key) => {
    const translations = {
      en: {
        open_invitation: "Open Invitation",
        hero_tagline: "Two souls, one heart.",
        save_the_date: "Save the Date",
        our_story: "Our Love Story",
        events: "Wedding Events",
        family: "Our Families",
        rsvp: "RSVP",
        venue: "Venue & Travel",
        gallery: "Gallery",
        boarding_pass: "Boarding Pass",
        wishes: "Wishes",
        see_you: "See You At The Wedding",
        groom: "Aarav",
        bride: "Priya",
        groom_full: "Aarav Sharma",
        bride_full: "Priya Verma",
        couple_names: "Aarav & Priya",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        date_full: "24th November, 2026",
        
        // Invitation Card
        tap_open: "TAP TO OPEN",
        together_families: "TOGETHER WITH THEIR FAMILIES",
        joyfully_invite: "Joyfully invite you to share in their happiness as they unite in marriage.",
        date_time: "TUESDAY, NOVEMBER 24, 2026\nAT FIVE O'CLOCK IN THE EVENING",
        palace_location: "The Royal Palace, Ambikapur, Chhattisgarh",
        close_invitation: "CLOSE INVITATION",

        // Love Story
        story_1_title: "First Meet",
        story_1_date: "April 2022",
        story_1_desc: "A brief encounter at a cafe turned into a beautiful beginning.",
        story_2_title: "The Proposal",
        story_2_date: "December 2024",
        story_2_desc: "Under the starlit sky, a promise was made for a lifetime.",
        story_3_title: "Engagement",
        story_3_date: "January 2025",
        story_3_desc: "Officially joining our families with joy and traditions.",

        // Events
        event_haldi: "Haldi",
        event_mehendi: "Mehendi",
        event_sangeet: "Sangeet",
        event_wedding: "Wedding",
        event_reception: "Reception",
        dress_code: "Dress Code",
        venue_label: "Venue",
        click_details: "CLICK FOR DETAILS",

        date_nov22: "Nov 22, 2026",
        date_nov23: "Nov 23, 2026",
        date_nov24: "Nov 24, 2026",
        date_nov25: "Nov 25, 2026",

        time_10am: "10:00 AM",
        time_4pm: "4:00 PM",
        time_7pm: "7:00 PM",
        time_5pm: "5:00 PM",
        time_8pm: "8:00 PM",

        venue_haldi: "Royal Courtyard",
        venue_mehendi: "Garden Pavilion",
        venue_sangeet: "Grand Ballroom",
        venue_wedding: "The Palace Mandap",
        venue_reception: "Crystal Hall",

        dress_haldi: "Shades of Yellow",
        dress_mehendi: "Green & Floral",
        dress_sangeet: "Glamorous Indo-Western",
        dress_wedding: "Traditional Royals",
        dress_reception: "Black Tie / Evening Gowns",
        desc_haldi: "Join us for a vibrant morning of Haldi ceremonies. The air will be filled with laughter, marigold fragrances, and traditional songs. Don't forget to wear shades of yellow to match the festive spirit!",
        desc_mehendi: "An evening dedicated to art, music, and dance. Get your hands adorned with beautiful henna designs while enjoying delicious street food and incredible performances.",
        desc_sangeet: "Get ready to dance the night away! Our families will present choreographed routines, followed by an open dance floor and a grand feast.",
        desc_wedding: "The most auspicious moment of our lives. We will take our vows under the majestic palace mandap. Join us as we step into our new life together.",
        desc_reception: "A glamorous evening to conclude the celebrations. Dress in your finest black tie or evening gowns for a night of toasts, fine dining, and live music.",
        
        // Gallery
        memories: "Memories",

        // Family
        parents_groom: "Parents of the Groom",
        parents_bride: "Parents of the Bride",
        brother: "Brother",
        sister: "Sister",
        groom_father: "Mr. Rajesh Sharma",
        groom_mother: "Mrs. Sunita Sharma",
        groom_brother: "Rohan Sharma",
        bride_father: "Mr. Vikram Verma",
        bride_mother: "Mrs. Anjali Verma",
        bride_sister: "Neha Verma",

        // RSVP
        rsvp_deadline: "KINDLY RESPOND BY OCTOBER 20, 2026",
        rsvp_thanks: "Thank You!",
        rsvp_received: "We have received your response.",
        form_name: "Full Name",
        form_guests: "No. of Guests",
        form_attendance: "Attendance",
        form_accept: "Joyfully Accepts",
        form_decline: "Regretfully Declines",
        form_food: "Food Preference",
        form_veg: "Vegetarian",
        form_nonveg: "Non-Vegetarian",
        form_vegan: "Vegan",
        form_message: "Message or Blessings for the couple...",
        form_submit: "SEND RSVP",

        // Venue
        venue_title: "Grand Palace",
        venue_address: "Ambikapur, Chhattisgarh, India",
        get_directions: "GET DIRECTIONS",
        travel: "Travel",
        travel_air: "By Air",
        nearest_airport: "Nearest Airport: Maa Mahamaya Airport, Darima (approx. 15km)",
        get_route_air: "Get Route from Airport",
        travel_train: "By Train",
        nearest_station: "Nearest Station: Ambikapur Railway Station (ABKP) (approx. 5km)",
        get_route_train: "Get Route from Station",
        accommodation: "Accommodation",
        acc_details: "Rooms have been reserved at our partner hotels.",

        // Boarding Pass
        bp_title: "Your Boarding Pass",
        bp_subtitle: "Enter your name to generate your personal boarding pass to our wedding.",
        bp_placeholder: "Enter your full name",
        bp_generate: "GENERATE",
        bp_passenger: "Passenger",
        bp_date_label: "Date",
        bp_date_val: "14 MAY 2026",
        bp_home: "HOME",
        bp_anywhere: "Anywhere",
        bp_dest: "AMBI",
        bp_dest_full: "Ambikapur, India",
        bp_board_time: "Boarding Time",
        bp_seat: "Seat",
        bp_download: "DOWNLOAD",
        bp_processing: "PROCESSING...",
        bp_share: "SHARE",
        bp_create_another: "CREATE ANOTHER PASS",
        bp_share_title: "My Wedding Boarding Pass",
        bp_share_text: "I got my boarding pass for Aarav & Priya's wedding! Get yours here: https://as-wedding.vercel.app/",
        bp_error: "Sharing is not supported on this device/browser. Please download it instead.",
        bp_fail: "Failed to download the pass. Please try again.",

        // Wishes Wall
        wishes_title: "Wishes Wall",
        wishes_subtitle: "Leave a message for the couple.",
        wishes_add: "Add Your Blessing",
        wishes_name: "Your Name",
        wishes_msg: "Your Message...",
        wishes_post: "POST WISH",
        time_just_now: "Just now",
        time_2_days: "2 days ago",
        time_1_week: "1 week ago",
        time_2_weeks: "2 weeks ago",
        wish_name_1: "Rahul & Sneha",
        wish_msg_1: "Wishing you a lifetime of love and happiness. Can't wait to celebrate!",
        wish_name_2: "Ananya",
        wish_msg_2: "So happy for you both! The perfect couple.",
        wish_name_3: "Karan",
        wish_msg_3: "Congratulations Aarav and Priya! Let the celebrations begin.",

        // Final
        final_msg: "\"We can't wait to celebrate the beginning of our new life with all our loved ones.\""
      },
      hi: {
        open_invitation: "निमंत्रण खोलें",
        hero_tagline: "दो आत्माएं, एक दिल।",
        save_the_date: "तारीख याद रखें",
        our_story: "हमारी कहानी",
        events: "विवाह समारोह",
        family: "हमारे परिवार",
        rsvp: "आमंत्रण (RSVP)",
        venue: "स्थल और यात्रा",
        gallery: "गैलरी",
        boarding_pass: "बोर्डिंग पास",
        wishes: "शुभकामनाएँ",
        see_you: "शादी में मिलते हैं",
        groom: "आरव",
        bride: "प्रिया",
        groom_full: "आरव शर्मा",
        bride_full: "प्रिया वर्मा",
        couple_names: "आरव और प्रिया",
        days: "दिन",
        hours: "घंटे",
        minutes: "मिनट",
        seconds: "सेकंड",
        date_full: "२४ नवंबर, २०२६",
        
        // Invitation Card
        tap_open: "खोलने के लिए टैप करें",
        together_families: "अपने परिवारों के साथ",
        joyfully_invite: "आपको उनके विवाह के पावन अवसर पर शामिल होने और खुशियां बांटने के लिए सहर्ष आमंत्रित करते हैं।",
        date_time: "मंगलवार, २४ नवंबर, २०२६\nशाम ५ बजे",
        palace_location: "द रॉयल पैलेस, अंबिकापुर, छत्तीसगढ़",
        close_invitation: "निमंत्रण बंद करें",

        // Love Story
        story_1_title: "पहली मुलाकात",
        story_1_date: "अप्रैल २०२२",
        story_1_desc: "कैफे में एक छोटी सी मुलाकात एक खूबसूरत शुरुआत में बदल गई।",
        story_2_title: "प्रस्ताव",
        story_2_date: "दिसंबर २०२४",
        story_2_desc: "तारों से भरे आसमान के नीचे, जीवन भर का वादा किया गया।",
        story_3_title: "सगाई",
        story_3_date: "जनवरी २०२५",
        story_3_desc: "खुशी और परंपराओं के साथ आधिकारिक तौर पर हमारे परिवारों को जोड़ना।",

        // Events
        event_haldi: "हल्दी",
        event_mehendi: "मेहंदी",
        event_sangeet: "संगीत",
        event_wedding: "विवाह",
        event_reception: "रिसेप्शन",
        dress_code: "ड्रेस कोड",
        venue_label: "स्थल",
        click_details: "विवरण के लिए क्लिक करें",

        date_nov22: "२२ नवंबर २०२६",
        date_nov23: "२३ नवंबर २०२६",
        date_nov24: "२४ नवंबर २०२६",
        date_nov25: "२५ नवंबर २०२६",

        time_10am: "सुबह १०:०० बजे",
        time_4pm: "शाम ४:०० बजे",
        time_7pm: "शाम ७:०० बजे",
        time_5pm: "शाम ५:०० बजे",
        time_8pm: "रात ८:०० बजे",

        venue_haldi: "रॉयल प्रांगण",
        venue_mehendi: "गार्डन पवेलियन",
        venue_sangeet: "ग्रैंड बॉलरूम",
        venue_wedding: "पैलेस मंडप",
        venue_reception: "क्रिस्टल हॉल",

        dress_haldi: "पीले रंग के शेड्स",
        dress_mehendi: "हरा और फ्लोरल",
        dress_sangeet: "ग्लैमरस इंडो-वेस्टर्न",
        dress_wedding: "पारंपरिक शाही",
        dress_reception: "ब्लैक टाई / इवनिंग गाउन",
        desc_haldi: "हल्दी समारोह की जीवंत सुबह के लिए हमारे साथ जुड़ें। हवा हँसी, गेंदे की खुशबू और पारंपरिक गीतों से भर जाएगी। त्योहारी माहौल से मेल खाने के लिए पीले रंग के कपड़े पहनना न भूलें!",
        desc_mehendi: "कला, संगीत और नृत्य को समर्पित एक शाम। स्वादिष्ट स्ट्रीट फूड और शानदार प्रदर्शन का आनंद लेते हुए अपने हाथों को सुंदर मेहंदी डिजाइनों से सजाएं।",
        desc_sangeet: "रात भर नृत्य करने के लिए तैयार हो जाइए! हमारे परिवार कोरियोग्राफ किए गए रूटीन प्रस्तुत करेंगे, जिसके बाद ओपन डांस फ्लोर और एक भव्य दावत होगी।",
        desc_wedding: "हमारे जीवन का सबसे शुभ क्षण। हम राजसी पैलेस मंडप के नीचे अपनी कसमें लेंगे। हमारे साथ जुड़ें क्योंकि हम एक साथ अपने नए जीवन में कदम रख रहे हैं।",
        desc_reception: "समारोह के समापन के लिए एक शानदार शाम। टोस्ट, बढ़िया भोजन और लाइव संगीत की रात के लिए अपने बेहतरीन ब्लैक टाई या इवनिंग गाउन पहनें।",
        
        // Gallery
        memories: "यादें",

        // Family
        parents_groom: "वर के माता-पिता",
        parents_bride: "वधू के माता-पिता",
        brother: "भाई",
        sister: "बहन",
        groom_father: "श्री राजेश शर्मा",
        groom_mother: "श्रीमती सुनीता शर्मा",
        groom_brother: "रोहन शर्मा",
        bride_father: "श्री विक्रम वर्मा",
        bride_mother: "श्रीमती अंजलि वर्मा",
        bride_sister: "नेहा वर्मा",

        // RSVP
        rsvp_deadline: "कृपया २० अक्टूबर २०२६ तक उत्तर दें",
        rsvp_thanks: "धन्यवाद!",
        rsvp_received: "हमें आपका उत्तर मिल गया है।",
        form_name: "पूरा नाम",
        form_guests: "मेहमानों की संख्या",
        form_attendance: "उपस्थिति",
        form_accept: "खुशी से स्वीकार",
        form_decline: "खेद सहित अस्वीकार",
        form_food: "भोजन प्राथमिकता",
        form_veg: "शाकाहारी",
        form_nonveg: "मांसाहारी",
        form_vegan: "वीगन",
        form_message: "जोड़े के लिए संदेश या आशीर्वाद...",
        form_submit: "RSVP भेजें",

        // Venue
        venue_title: "ग्रैंड पैलेस",
        venue_address: "अंबिकापुर, छत्तीसगढ़, भारत",
        get_directions: "रास्ता देखें",
        travel: "यात्रा",
        travel_air: "हवाई मार्ग द्वारा",
        nearest_airport: "निकटतम हवाई अड्डा: माँ महामाया हवाई अड्डा, दरिमा (लगभग १५ किमी)",
        get_route_air: "हवाई अड्डे से रास्ता देखें",
        travel_train: "ट्रेन द्वारा",
        nearest_station: "निकटतम स्टेशन: अंबिकापुर रेलवे स्टेशन (ABKP) (लगभग ५ किमी)",
        get_route_train: "स्टेशन से रास्ता देखें",
        accommodation: "आवास",
        acc_details: "हमारे पार्टनर होटलों में कमरे बुक किए गए हैं।",

        // Boarding Pass
        bp_title: "आपका बोर्डिंग पास",
        bp_subtitle: "हमारी शादी का व्यक्तिगत बोर्डिंग पास बनाने के लिए अपना नाम दर्ज करें।",
        bp_placeholder: "अपना पूरा नाम दर्ज करें",
        bp_generate: "जेनरेट करें",
        bp_passenger: "यात्री",
        bp_date_label: "तारीख",
        bp_date_val: "१४ मई २०२६",
        bp_home: "घर",
        bp_anywhere: "कहीं से भी",
        bp_dest: "अंबिकापुर",
        bp_dest_full: "अंबिकापुर, भारत",
        bp_board_time: "बोर्डिंग समय",
        bp_seat: "सीट",
        bp_download: "डाउनलोड",
        bp_processing: "प्रक्रिया हो रही है...",
        bp_share: "शेयर करें",
        bp_create_another: "नया पास बनाएं",
        bp_share_title: "मेरा वेडिंग बोर्डिंग पास",
        bp_share_text: "मुझे आरव और प्रिया की शादी का बोर्डिंग पास मिल गया है! अपना यहाँ प्राप्त करें: https://as-wedding.vercel.app/",
        bp_error: "इस डिवाइस/ब्राउज़र पर शेयरिंग समर्थित नहीं है। कृपया इसे डाउनलोड करें।",
        bp_fail: "पास डाउनलोड करने में विफल। कृपया पुनः प्रयास करें।",

        // Wishes Wall
        wishes_title: "शुभकामनाएँ",
        wishes_subtitle: "जोड़े के लिए एक संदेश छोड़ें।",
        wishes_add: "अपना आशीर्वाद जोड़ें",
        wishes_name: "आपका नाम",
        wishes_msg: "आपका संदेश...",
        wishes_post: "शुभकामना भेजें",
        time_just_now: "अभी-अभी",
        time_2_days: "२ दिन पहले",
        time_1_week: "१ सप्ताह पहले",
        time_2_weeks: "२ सप्ताह पहले",
        wish_name_1: "राहुल और स्नेहा",
        wish_msg_1: "आपको जीवन भर प्यार और खुशी की शुभकामनाएं। जश्न मनाने का बेसब्री से इंतजार है!",
        wish_name_2: "अनन्या",
        wish_msg_2: "आप दोनों के लिए बहुत खुश हूँ! एकदम सही जोड़ी।",
        wish_name_3: "करन",
        wish_msg_3: "आरव और प्रिया को बधाई! चलिए जश्न शुरू करते हैं।",

        // Final
        final_msg: "\"हम अपने सभी प्रियजनों के साथ अपने नए जीवन की शुरुआत का जश्न मनाने के लिए उत्सुक हैं।\""
      }
    };
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
