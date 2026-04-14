import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { 
  LucideAngularModule, 
  Search, Bell, ChevronDown, ChevronRight, ChevronLeft, Plus, MoreVertical, 
  Play, Send, Repeat, ArrowRight, Download, CreditCard, FileText, Settings, 
  Home, List, ArrowLeftRight, Landmark, User, Layers, 
  LayoutDashboard, ShoppingBag, Boxes, ShoppingCart, Archive, LogOut, X,
  TrendingUp, TrendingDown, Users, DollarSign, Activity, Zap, BarChart3,
  Package, AlertCircle, Trash2, Edit, RefreshCw, Image,
  HelpCircle, Menu, UserCircle,
  ListOrdered, Clock, Truck, CheckCircle2, XCircle, CircleDashed, Inbox, Check, Flag, MoreHorizontal
} from 'lucide-angular';

import { routes } from './app.routes';
import { provideZard } from '@/shared/core/provider/providezard';
import { VIEW_ACTIVE_REGISTRY, VIEW_COMMAND_MAPPER_REGISTRY, VIEW_REF_MAPPER_REGISTRY, ViewActive } from '@view/base';
import { ViewCommandMapper } from './core/view-config/view.command.mapper';
import { ViewRefMapper } from './core/view-config/view.ref.mapper';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(),
    provideRouter(routes),
    provideZard(),
    importProvidersFrom(LucideAngularModule.pick({ 
      Search, Bell, ChevronDown, ChevronRight, ChevronLeft, Plus, MoreVertical, 
      Play, Send, Repeat, ArrowRight, Download, CreditCard, FileText, Settings, 
      Home, List, ArrowLeftRight, Landmark, User, Layers,
      LayoutDashboard, ShoppingBag, Boxes, ShoppingCart, Archive, LogOut, X,
      TrendingUp, TrendingDown, Users, DollarSign, Activity, Zap, BarChart3,
      Package, AlertCircle, Trash2, Edit, RefreshCw, Image,
      HelpCircle, Menu, UserCircle,
      ListOrdered, Clock, Truck, CheckCircle2, XCircle, CircleDashed, Inbox, Check, Flag, MoreHorizontal
    })),
    { provide: VIEW_COMMAND_MAPPER_REGISTRY, useClass: ViewCommandMapper },
    { provide: VIEW_REF_MAPPER_REGISTRY, useClass: ViewRefMapper },
    { provide: VIEW_ACTIVE_REGISTRY, useClass: ViewActive },
  ]
};





