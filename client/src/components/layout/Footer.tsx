import React from 'react';
import { HardHat, Phone, Mail, MapPin, Heart, ArrowRight, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const { language } = useUIStore();

  return (
    <footer className="relative bg-[#161413] text-slate-300 pt-0 pb-28 sm:pb-12 border-t-4 border-industrial-500">
      {/* Top Pre-Footer Banner in Theme Color #f08665 */}
      <div className="bg-gradient-to-r from-industrial-600 via-industrial-500 to-industrial-600 py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                {language === 'hi' ? 'क्या आपकी कंपनी को तुरंत मैनपावर चाहिए?' : 'Need Verified Industrial Workers Urgently?'}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm font-medium">
                {language === 'hi'
                  ? 'पावर, स्टील, सीमेंट और रिफाइनरी प्रोजेक्ट्स के लिए 24 घंटे में तैनाती।'
                  : 'Fast deployment across Power, Steel, Cement, and Refinery projects.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="px-5 py-2.5 rounded-2xl bg-white text-industrial-700 font-extrabold text-xs sm:text-sm shadow-md hover:bg-industrial-50 transition-all active:scale-95 inline-flex items-center gap-1.5"
            >
              <span>{language === 'hi' ? 'कंपनी रजिस्ट्रेशन' : 'Employer Register'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-2xl bg-industrial-800/40 border border-white/30 text-white font-extrabold text-xs sm:text-sm hover:bg-industrial-800/60 transition-all"
            >
              {language === 'hi' ? 'वर्कर लॉगिन' : 'Worker Login'}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <Logo size="lg" variant="dark" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'भारत के प्रमुख भारी उद्योगों (पावर, स्टील, सीमेंट, रिफाइनरी) को प्रमाणित और भरोसेमंद मैनपावर प्रदान करने वाला पहला डिजिटल प्लेटफॉर्म।'
                : 'India’s premier industrial manpower platform connecting certified technicians with top heavy manufacturing & infrastructure projects.'}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-industrial-400 bg-industrial-950/60 border border-industrial-900 px-3 py-1.5 rounded-xl inline-flex">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Aadhaar & Skill Verified</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-industrial-500 rounded-full"></span>
              <span>{language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#industries" className="hover:text-industrial-400 transition-colors">{language === 'hi' ? 'उद्योग क्षेत्र' : 'Industries Served'}</a></li>
              <li><a href="#services" className="hover:text-industrial-400 transition-colors">{language === 'hi' ? 'कारीगर श्रेणियां' : 'Services & Skill Trades'}</a></li>
              <li><a href="#howitworks" className="hover:text-industrial-400 transition-colors">{language === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}</a></li>
              <li><Link to="/login" className="hover:text-industrial-400 transition-colors">{language === 'hi' ? 'वर्कर लॉगिन' : 'Worker Login'}</Link></li>
              <li><Link to="/register" className="hover:text-industrial-400 transition-colors">{language === 'hi' ? 'पंजीकरण (फ्री)' : 'Free Registration'}</Link></li>
              <li>
                <a
                  href="/workpower-app.apk"
                  download="WorkPower-v1.0.apk"
                  className="inline-flex items-center gap-1.5 text-industrial-400 font-extrabold hover:text-industrial-300 transition-colors"
                >
                  <span>📲 {language === 'hi' ? 'मोबाइल ऐप डाउनलोड (APK)' : 'Download App (APK)'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Major Trades */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-industrial-500 rounded-full"></span>
              <span>{language === 'hi' ? 'मुख्य ट्रेड्स' : 'Popular Trades'}</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-industrial-300 transition-colors">{language === 'hi' ? '6G / 3G वेल्डर (Welder)' : '6G / 3G Welder'}</li>
              <li className="hover:text-industrial-300 transition-colors">{language === 'hi' ? 'स्ट्रक्चरल एवं पाइप फ़िटर' : 'Structural & Pipe Fitter'}</li>
              <li className="hover:text-industrial-300 transition-colors">{language === 'hi' ? 'हेवी रिगर (Heavy Rigger)' : 'Heavy Rigger'}</li>
              <li className="hover:text-industrial-300 transition-colors">{language === 'hi' ? 'इंडस्ट्रियल इलेक्ट्रिशियन' : 'Industrial Electrician'}</li>
              <li className="hover:text-industrial-300 transition-colors">{language === 'hi' ? 'सेफ़्टी ऑफिसर एवं सुपरवाइजर' : 'Safety Officer & Supervisor'}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-industrial-500 rounded-full"></span>
              <span>{language === 'hi' ? 'संपर्क सहायता' : 'Contact Support'}</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-industrial-950 border border-industrial-800 text-industrial-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-bold">24/7 Helpline</span>
                  <span className="font-semibold text-white">+91 1800-123-WORK</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-industrial-950 border border-industrial-800 text-industrial-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-bold">Email Support</span>
                  <span className="font-semibold text-white">support@workpower.in</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-industrial-950 border border-industrial-800 text-industrial-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 font-bold">Headquarters</span>
                  <span className="text-slate-300 text-xs">Industrial Belt, Korba / Bokaro / Jamshedpur, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 WorkPower Industrial Platform. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl backdrop-blur-sm">
            <span>{language === 'hi' ? 'निर्मित एवं संचालित' : 'Made with'}</span>
            <Heart className="w-3.5 h-3.5 text-industrial-500 fill-industrial-500" />
            <span>by</span>
            <a
              href="https://www.catcatchcodes.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-industrial-400 font-extrabold hover:text-industrial-300 hover:underline inline-flex items-center gap-1 transition-colors"
            >
              <span>CatCatchCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
