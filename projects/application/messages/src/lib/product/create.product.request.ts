export interface MediaItem {
  type: string;
  url: string;
  public_id?: string;
}

export interface StockInfo {
  quantity: number;
  track_inventory: boolean;
}

export interface BulkPricingTier {
  min_quantity: number;
  price: number;
}

export interface ShippingInfo {
  type: string;
  fee: number;
}

export interface PreorderInfo {
  is_preorder: boolean;
  available_date?: string | null;
}

export interface SocialSharing {
  share_facebook?: boolean;
}

export class CreateProductRequest {
  public name!: string;
  public description?: string;
  public short_description?: string;
  
  public media?: MediaItem[];
  public categories?: string[];
  public gtin?: string;
  
  public price!: number;
  public compare_at_price?: number;
  public currency!: string;
  
  public stock!: StockInfo;
  public bulk_pricing?: BulkPricingTier[];
  public shipping?: ShippingInfo;
  
  public condition?: string;
  public preorder?: PreorderInfo;
  public social?: SocialSharing;
  
  public sku!: string;
  public status!: string;
}
